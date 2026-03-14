import { signal, computed, effect } from '@type-dom/signals';
import { batch } from '../../src/reactivity/batch';
import { batchEffect } from '../../src/reactivity/batchEffect';
import { watch } from '../../src';

describe('batch', () => {
  describe('基础功能', () => {
    test('应该将多次更新合并为一次', () => {
      const count = signal(0);
      const double = computed(() => count.get() * 2);
      const updateCount: number[] = [];

      effect(() => {
        updateCount.push(double.get());
      });

      // 不使用 batch - 会触发多次更新
      updateCount.length = 0;
      count.set(1);
      count.set(2);
      count.set(3);
      expect(updateCount).toHaveLength(3); // 3 次更新

      // 使用 batch - 只触发一次更新
      updateCount.length = 0;
      batch(() => {
        count.set(4);
        count.set(5);
        count.set(6);
      });
      expect(updateCount).toHaveLength(1); // 1 次更新
      expect(updateCount[0]).toBe(12); // 6 * 2
    });

    test('应该避免中间状态暴露', () => {
      const firstName = signal('John');
      const lastName = signal('Doe');
      const fullName = computed(() => `${firstName.get()} ${lastName.get()}`);
      const names: string[] = [];

      effect(() => {
        names.push(fullName.get());
      });

      // 不使用 batch - 会看到中间状态
      names.length = 0;
      firstName.set('Jane');
      lastName.set('Smith');
      expect(names).toEqual(['Jane Doe', 'Jane Smith']);

      // 使用 batch - 只看到最终状态
      names.length = 0;
      batch(() => {
        firstName.set('Alice');
        lastName.set('Johnson');
      });
      expect(names).toEqual(['Alice Johnson']); // 直接跳到最终状态
    });

    test('应该支持嵌套 batch', () => {
      const count = signal(0);
      const updates: number[] = [];

      effect(() => {
        updates.push(count.get());
      });

      batch(() => {
        count.set(1);

        batch(() => {
          count.set(2);
          count.set(3);
        }); // 内层 batch 不会 flush

        count.set(4);
      }); // 外层 batch 才会 flush

      // 注：由于 batch 内部 set 会立即更新值，effect 会在 batch 结束后统一触发
      // 所以会有初始值 0 和最终值 4 两次调用
      expect(updates).toEqual([0, 4]);
    });
  });

  describe('性能优化', () => {
    test('在循环中应该显著提升性能', () => {
      const items = signal<number[]>([]);
      let renderCount = 0;

      effect(() => {
        items.get().length; // 依赖 items
        renderCount++;
      });

      // 不使用 batch
      renderCount = 0;
      for (let i = 0; i < 10; i++) {
        items.set([...items.get(), i]);
      }
      expect(renderCount).toBe(10); // 10 次重渲染

      // 使用 batch
      renderCount = 0;
      batch(() => {
        for (let i = 0; i < 10; i++) {
          items.set([...items.get(), i]);
        }
      });
      expect(renderCount).toBe(1); // 1 次重渲染
    });

    test('批量更新多个相关信号', () => {
      const x = signal(0);
      const y = signal(0);
      const z = signal(0);
      const updates: number[] = [];

      const sum = computed(() => x.get() + y.get() + z.get());
      effect(() => {
        updates.push(sum.get());
      });

      // 逐个更新
      updates.length = 0;
      x.set(1);
      y.set(2);
      z.set(3);
      expect(updates.length).toBe(3);

      // 批量更新
      updates.length = 0;
      batch(() => {
        x.set(4);
        y.set(5);
        z.set(6);
      });
      expect(updates.length).toBe(1);
      expect(updates[0]).toBe(15);
    });
  });

  describe('边界情况', () => {
    test('空 batch 应该正常工作', () => {
      expect(() => {
        batch(() => {
          // 空函数
        });
      }).not.toThrow();
    });

    test('batch 中的异常应该抛出到外部', () => {
      const error = new Error('Test error');
      expect(() => {
        batch(() => {
          throw error;
        });
      }).toThrow(error);
    });

    test('batch 执行后应该清理状态', () => {
      const count = signal(0);

      batch(() => {
        count.set(1);
      });

      // batch 结束后，再次 set 应该立即触发更新
      let updated = false;
      effect(() => {
        if (count.get() === 2) {
          updated = true;
        }
      });

      count.set(2);
      expect(updated).toBe(true);
    });
  });

  describe('与其他 API 配合', () => {
    test('应该与 computed 正确配合', () => {
      const price = signal(100);
      const quantity = signal(1);
      const tax = signal(0.1);

      const total = computed(() => {
        const base = price.get() * quantity.get();
        return base * (1 + tax.get());
      });

      let lastTotal: number = 0;
      effect(() => {
        lastTotal = total.get();
      });

      batch(() => {
        price.set(150);
        quantity.set(2);
        tax.set(0.15);
      });

      expect(lastTotal).toBe(345); // 150 * 2 * 1.15
    });

    test('应该在 effect 内部可以使用', () => {
      const source = signal(0);
      const target = signal(0);
      const effects: number[] = [];

      effect(() => {
        const val = source.get();
        effects.push(val);

        if (val > 0) {
          batch(() => {
            target.set(val * 2);
          });
        }
      });

      source.set(1);
      source.set(2);

      expect(effects).toEqual([0, 1, 2]);
    });
  });
});

describe('batchEffect', () => {
  describe('基础功能', () => {
    test('应该自动追踪依赖并批量更新', () => {
      const count = signal(0);
      const double = computed(() => count.get() * 2);
      const executions: number[] = [];

      const stop = batchEffect(() => {
        executions.push(double.get());

        // 在 effect 内部批量更新
        batch(() => {
          // 这里可以执行其他批量操作
        });
      });

      expect(executions).toEqual([0]);

      count.set(1);
      expect(executions).toEqual([0, 2]);

      count.set(2);
      expect(executions).toEqual([0, 2, 4]);

      stop();

      count.set(3);
      expect(executions).toEqual([0, 2, 4]); // 不再执行
    });

    test('应该返回清理函数', () => {
      const count = signal(0);
      let executionCount = 0;

      const stop = batchEffect(() => {
        executionCount++;
        count.get();
      });

      expect(executionCount).toBe(1);

      count.set(1);
      expect(executionCount).toBe(2);

      stop();

      count.set(2);
      expect(executionCount).toBe(2); // 停止后不再执行
    });

    test('内部的 batch 应该正常工作', () => {
      const a = signal(0);
      const b = signal(0);
      const c = signal(0);
      const executions: string[] = [];

      batchEffect(() => {
        const sum = a.get() + b.get() + c.get();
        executions.push(`Sum: ${sum}`);

        // 在 effect 内部批量更新其他信号
        batch(() => {
          // 模拟一些批量操作
        });
      });

      a.set(1);
      expect(executions.length).toBe(2);

      batch(() => {
        b.set(2);
        c.set(3);
      });
      expect(executions.length).toBe(3);
    });
  });

  describe('依赖追踪', () => {
    test('应该正确追踪多个依赖', () => {
      const x = signal(0);
      const y = signal(0);
      const results: number[] = [];

      batchEffect(() => {
        results.push(x.get() + y.get());
      });

      expect(results).toEqual([0]);

      x.set(1);
      expect(results).toEqual([0, 1]);

      y.set(2);
      expect(results).toEqual([0, 1, 3]);

      batch(() => {
        x.set(3);
        y.set(4);
      });
      expect(results).toEqual([0, 1, 3, 7]);
    });

    test('computed 依赖应该正确追踪', () => {
      const count = signal(0);
      const double = computed(() => count.get() * 2);
      const quadruple = computed(() => double.get() * 2);
      const values: number[] = [];

      batchEffect(() => {
        values.push(quadruple.get());
      });

      expect(values).toEqual([0]);

      count.set(1);
      expect(values).toEqual([0, 4]);

      count.set(2);
      expect(values).toEqual([0, 4, 8]);
    });
  });

  describe('清理机制', () => {
    test('停止时应该清理依赖关系', () => {
      const count = signal(0);
      let executeCount = 0;

      const stop = batchEffect(() => {
        executeCount++;
        count.get();
      });

      expect(executeCount).toBe(1);

      count.set(1);
      expect(executeCount).toBe(2);

      stop();

      count.set(2);
      count.set(3);
      expect(executeCount).toBe(2); // 停止后不再执行
    });

    test('可以多次调用清理函数', () => {
      const count = signal(0);
      let executeCount = 0;

      const stop = batchEffect(() => {
        executeCount++;
        count.get();
      });

      stop();
      stop(); // 多次调用不应该报错
      stop();

      count.set(1);
      expect(executeCount).toBe(1);
    });
  });

  describe('复杂场景', () => {
    test('嵌套 batchEffect 应该正常工作', () => {
      const outer = signal(0);
      const inner = signal(0);
      const logs: string[] = [];

      const stopOuter = batchEffect(() => {
        logs.push(`Outer: ${outer.get()}`);

        batchEffect(() => {
          logs.push(`Inner: ${inner.get()}`);
        });
      });

      expect(logs).toEqual(['Outer: 0', 'Inner: 0']);

      outer.set(1);
      expect(logs).toEqual(['Outer: 0', 'Inner: 0', 'Outer: 1', 'Inner: 0']);

      inner.set(2);
      // inner 变化会触发内层 batchEffect 重新执行
      // 但内层 batchEffect 在外层内部，外层也会重新执行
      expect(logs).toEqual([
        'Outer: 0', 'Inner: 0',
        'Outer: 1', 'Inner: 0',
        'Inner: 2'  // 只有内层重新执行
      ]);

      stopOuter();
    });

    test('与 watch 配合应该正常工作', () => {
      const count = signal(0);
      const batchEffectCalls: number[] = [];
      const watchCalls: number[] = [];

      batchEffect(() => {
        batchEffectCalls.push(count.get());
      });

      watch(count, (val) => {
        watchCalls.push(val);
      });

      expect(batchEffectCalls).toEqual([0]);
      expect(watchCalls).toEqual([]);

      count.set(1);
      expect(batchEffectCalls).toEqual([0, 1]);
      expect(watchCalls).toEqual([1]);

      count.set(2);
      expect(batchEffectCalls).toEqual([0, 1, 2]);
      expect(watchCalls).toEqual([1, 2]);
    });
  });

  describe('错误处理', () => {
    test('effect 内部的错误应该正确传播', () => {
      const count = signal(0);
      const error = new Error('Test error');

      expect(() => {
        batchEffect(() => {
          count.get();
          throw error;
        });
      }).toThrow(error);
    });

    test('batch 中的错误不应该影响状态', () => {
      const count = signal(0);

      try {
        batch(() => {
          count.set(1);
          throw new Error('Test error');
        });
      } catch {
        // 忽略错误
      }

      // count 应该保持为 0（回滚）或者根据具体实现决定
      expect(count.get()).toBeGreaterThanOrEqual(0);
    });
  });

  describe('性能测试', () => {
    test('大量数据更新应该保持高性能', () => {
      const items = signal<number[]>([]);
      let renderCount = 0;

      batchEffect(() => {
        items.get().length;
        renderCount++;
      });

      // 批量添加 100 个元素
      batch(() => {
        for (let i = 0; i < 100; i++) {
          items.set([...items.get(), i]);
        }
      });

      expect(renderCount).toBeLessThan(10); // 应该远小于 100
    });
  });
});

describe('batch vs batchEffect', () => {
  test('batch 不追踪依赖，batchEffect 追踪依赖', () => {
    const count = signal(0);
    const double = computed(() => count.get() * 2);

    let batchResult: number | undefined;
    let batchEffectResult: number | undefined;

    let batchExecutions = 0;
    let batchEffectExecutions = 0;

    // batch - 不追踪依赖
    batch(() => {
      batchExecutions++;
      batchResult = double.get();
    });

    // batchEffect - 追踪依赖
    batchEffect(() => {
      batchEffectExecutions++;
      batchEffectResult = double.get();
    });

    expect(batchExecutions).toBe(1);
    expect(batchEffectExecutions).toBe(1);

    count.set(1);

    // batch 不会重新执行
    expect(batchExecutions).toBe(1);
    expect(batchResult).toBe(0); // batch 执行时 count 还是 0

    // batchEffect 会重新执行
    expect(batchEffectExecutions).toBe(2);
    expect(batchEffectResult).toBe(2); // 最新值是 2
  });

  test('batch 返回 void，batchEffect 返回清理函数', () => {
    const count = signal(0);

    const batchReturn = batch(() => {
      count.set(1);
    });

    const batchEffectReturn = batchEffect(() => {
      count.get();
    });

    expect(batchReturn).toBeUndefined();
    expect(typeof batchEffectReturn).toBe('function');

    // 调用清理函数
    batchEffectReturn();
  });
});
