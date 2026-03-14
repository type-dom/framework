# TypeDOM 测试规范指南

> 🧪 **TypeDOM 框架测试标准**
> 📍 Vitest 单元测试 + Playwright E2E 测试

---

## 📖 概述

TypeDOM 采用测试驱动开发（TDD）理念，确保代码质量和稳定性。

### 测试金字塔

```
        /\
       /  \      E2E Tests (Playwright)
      /----\     覆盖率目标：≥50%
     /      \    
    /--------\   Integration Tests
   /          \  覆盖率目标：≥70%
  /------------\ 
 /              \ Unit Tests (Vitest)
/----------------\ 覆盖率目标：≥90%
```

### 测试工具栈

- **单元测试**: Vitest
- **E2E 测试**: Playwright  
- **覆盖率**: Istanbul/nyc
- **Mock 工具**: Vitest 内置 mock

---

## 🔧 Vitest 配置

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    pool: 'threads',
    setupFiles: ['./tools/scripts/setup-vitest.ts'],
    testTimeout: 30000,
    hookTimeout: 30000,
    coverage: {
      provider: 'istanbul',
      reporter: ['text', 'json', 'html'],
      threshold: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90
      }
    }
  }
});
```

---

## 📝 组件测试模板

### 模板 1: 基础组件测试

```typescript
/**
 * TdButton 组件单元测试
 */

import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { TdButton } from '../Button';
import { TypeDiv } from '@type-dom/framework';

describe('TdButton', () => {
  let button: TdButton;
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (button) {
      button.unmount();
    }
    container.remove();
  });

  describe('初始化', () => {
    test('应该成功创建实例', () => {
      button = new TdButton();
      button.mount(container);
      
      expect(button).toBeDefined();
      expect(button.className).toBe('TdButton');
    });

    test('应该有正确的 CSS 类名', () => {
      button = new TdButton();
      button.mount(container);
      
      expect(button.dom.classList).toContain('td-button');
    });

    test('应该应用默认的 type 属性', () => {
      button = new TdButton();
      button.mount(container);
      
      expect(button.dom.classList).toContain('td-button--default');
    });

    test('应该应用默认的 size 属性', () => {
      button = new TdButton();
      button.mount(container);
      
      expect(button.dom.classList).toContain('td-button--medium');
    });
  });

  describe('Props', () => {
    test('应该支持 type 属性', () => {
      button = new TdButton({ type: 'primary' });
      button.mount(container);
      
      expect(button.dom.classList).toContain('td-button--primary');
      expect(button.dom.classList).not.toContain('td-button--default');
    });

    test('应该支持 size 属性', () => {
      button = new TdButton({ size: 'large' });
      button.mount(container);
      
      expect(button.dom.classList).toContain('td-button--large');
    });

    test('应该支持 disabled 属性', () => {
      button = new TdButton({ disabled: true });
      button.mount(container);
      
      expect(button.hasAttribute('disabled')).toBe(true);
      expect(button.dom.classList).toContain('td-button--disabled');
    });

    test('应该支持 loading 属性', () => {
      button = new TdButton({ loading: true });
      button.mount(container);
      
      expect(button.dom.classList).toContain('td-button--loading');
      expect(button.textContent).toContain('Loading...');
    });
  });

  describe('事件', () => {
    test('应该触发 click 事件', () => {
      const handleClick = vi.fn();
      button = new TdButton({ onClick: handleClick });
      button.mount(container);
      
      button.dom.click();
      
      expect(handleClick).toHaveBeenCalledTimes(1);
      expect(handleClick).toHaveBeenCalledWith(expect.any(MouseEvent));
    });

    test('应该发射 click 事件', () => {
      const handleEmit = vi.fn();
      button = new TdButton();
      button.on('click', handleEmit);
      button.mount(container);
      
      button.dom.click();
      
      expect(handleEmit).toHaveBeenCalledTimes(1);
    });

    test('disabled 状态下不应该触发点击事件', () => {
      const handleClick = vi.fn();
      button = new TdButton({ disabled: true, onClick: handleClick });
      button.mount(container);
      
      button.dom.click();
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    test('loading 状态下不应该触发点击事件', () => {
      const handleClick = vi.fn();
      button = new TdButton({ loading: true, onClick: handleClick });
      button.mount(container);
      
      button.dom.click();
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('生命周期', () => {
    test('应该按顺序执行生命周期钩子', () => {
      const hooks: string[] = [];
      
      class TestButton extends TdButton {
        beforeCreate() {
          hooks.push('beforeCreate');
        }
        
        created() {
          hooks.push('created');
        }
        
        beforeMount() {
          hooks.push('beforeMount');
        }
        
        mounted() {
          hooks.push('mounted');
        }
      }
      
      button = new TestButton();
      button.mount(container);
      
      expect(hooks).toEqual([
        'beforeCreate',
        'created',
        'beforeMount',
        'mounted'
      ]);
    });
  });

  describe('清理', () => {
    test('unmount 时应该清理所有子节点', () => {
      button = new TdButton({ children: ['Test'] });
      button.mount(container);
      
      expect(container.children.length).toBeGreaterThan(0);
      
      button.unmount();
      
      expect(container.children.length).toBe(0);
    });

    test('unmount 时应该移除事件监听器', () => {
      const handleClick = vi.fn();
      button = new TdButton({ onClick: handleClick });
      button.mount(container);
      
      button.unmount();
      button.dom.click();
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
```

---

### 模板 2: 响应式组件测试

```typescript
/**
 * TdCounter 响应式组件测试
 */

import { describe, test, expect, vi } from 'vitest';
import { TdCounter } from '../Counter';
import { signal, nextTick } from '@type-dom/signals';

describe('TdCounter', () => {
  test('应该响应式更新计数', async () => {
    const counter = new TdCounter({ initialValue: 0 });
    counter.mount(document.body);
    
    const display = counter.findChildNode('TypeSpan');
    expect(display?.textContent).toBe('0');
    
    // 增加
    counter.increment();
    await nextTick();
    
    expect(display?.textContent).toBe('1');
    
    // 减少
    counter.decrement();
    await nextTick();
    
    expect(display?.textContent).toBe('0');
    
    counter.unmount();
  });

  test('应该遵守 min/max 限制', async () => {
    const counter = new TdCounter({
      initialValue: 5,
      min: 0,
      max: 10
    });
    counter.mount(document.body);
    
    // 超过最大值
    for (let i = 0; i < 10; i++) {
      counter.increment();
    }
    await nextTick();
    
    expect(counter.getValue()).toBe(10);
    
    // 低于最小值
    for (let i = 0; i < 15; i++) {
      counter.decrement();
    }
    await nextTick();
    
    expect(counter.getValue()).toBe(0);
    
    counter.unmount();
  });

  test('应该触发 onChange 回调', async () => {
    const handleChange = vi.fn();
    const counter = new TdCounter({
      initialValue: 0,
      onChange: handleChange
    });
    counter.mount(document.body);
    
    counter.increment();
    await nextTick();
    
    expect(handleChange).toHaveBeenCalledWith(1);
    
    counter.decrement();
    await nextTick();
    
    expect(handleChange).toHaveBeenCalledWith(0);
    
    counter.unmount();
  });

  test('按钮禁用状态应该正确更新', async () => {
    const counter = new TdCounter({
      initialValue: 0,
      min: 0,
      max: 5
    });
    counter.mount(document.body);
    
    const buttons = counter.findDownNodes('TypeButton');
    const [decrementBtn, incrementBtn] = buttons;
    
    // 初始状态： decrement 应该禁用
    expect((decrementBtn as any).hasAttribute('disabled')).toBe(true);
    expect((incrementBtn as any).hasAttribute('disabled')).toBe(false);
    
    // 增加到最大值
    for (let i = 0; i < 5; i++) {
      counter.increment();
    }
    await nextTick();
    
    // 最大值时：increment 应该禁用
    expect((incrementBtn as any).hasAttribute('disabled')).toBe(true);
    expect((decrementBtn as any).hasAttribute('disabled')).toBe(false);
    
    counter.unmount();
  });
});
```

---

### 模板 3: batch/batchEffect 测试

```typescript
/**
 * batch 和 batchEffect 测试
 */

import { describe, test, expect, vi } from 'vitest';
import { signal, computed, effect, batch, batchEffect } from '@type-dom/signals';

describe('batch', () => {
  test('应该批量更新信号', () => {
    const count = signal(0);
    const updates: number[] = [];

    effect(() => {
      updates.push(count.get());
    });

    batch(() => {
      count.set(1);
      count.set(2);
      count.set(3);
    });

    // effect 只在 batch 结束后执行一次
    expect(updates).toEqual([0, 3]);
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
      });

      count.set(4);
    });

    // 只有外层 batch 结束时才 flush
    expect(updates).toEqual([0, 4]);
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
    expect(names).toEqual(['Alice Johnson']);
  });

  test('在循环中应该显著提升性能', () => {
    const items = signal<number[]>([]);
    let renderCount = 0;

    effect(() => {
      items.get().length;
      renderCount++;
    });

    // 不使用 batch
    renderCount = 0;
    for (let i = 0; i < 10; i++) {
      items.set([...items.get(), i]);
    }
    expect(renderCount).toBe(10);

    // 使用 batch
    renderCount = 0;
    batch(() => {
      for (let i = 0; i < 10; i++) {
        items.set([...items.get(), i]);
      }
    });
    expect(renderCount).toBe(1);
  });
});

describe('batchEffect', () => {
  test('应该自动追踪依赖并批量更新', () => {
    const count = signal(0);
    const executions: number[] = [];

    const stop = batchEffect(() => {
      executions.push(count.get());
    });

    expect(executions).toEqual([0]);

    count.set(1);
    expect(executions).toEqual([0, 1]);

    count.set(2);
    expect(executions).toEqual([0, 1, 2]);

    stop();

    count.set(3);
    expect(executions).toEqual([0, 1, 2]); // 不再执行
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
    const executions: number[] = [];

    batchEffect(() => {
      executions.push(a.get() + b.get());
    });

    batch(() => {
      a.set(1);
      b.set(2);
    });

    expect(executions).toEqual([0, 3]);
  });
});

describe('batch vs batchEffect', () => {
  test('batch 不追踪依赖，batchEffect 追踪依赖', () => {
    const count = signal(0);
    const double = computed(() => count.get() * 2);

    let batchExecutions = 0;
    let batchEffectExecutions = 0;

    // batch - 不追踪依赖
    batch(() => {
      batchExecutions++;
      double.get();
    });

    // batchEffect - 追踪依赖
    batchEffect(() => {
      batchEffectExecutions++;
      double.get();
    });

    expect(batchExecutions).toBe(1);
    expect(batchEffectExecutions).toBe(1);

    count.set(1);

    // batch 不会重新执行
    expect(batchExecutions).toBe(1);

    // batchEffect 会重新执行
    expect(batchEffectExecutions).toBe(2);
  });
});
```

---

### 模板 4: 列表组件测试

```typescript
/**
 * TdList 列表组件测试
 */

import { describe, test, expect, vi } from 'vitest';
import { TdList } from '../List';
import { nextTick } from '@type-dom/signals';

describe('TdList', () => {
  test('应该渲染空列表提示', () => {
    const list = new TdList({ items: [] });
    list.mount(document.body);
    
    const emptyItem = list.findChildNode('TypeLi');
    expect(emptyItem?.textContent).toBe('No items found');
    
    list.unmount();
  });

  test('应该渲染列表项', () => {
    const items = [
      { id: 1, label: 'Item 1' },
      { id: 2, label: 'Item 2' },
      { id: 3, label: 'Item 3' }
    ];
    
    const list = new TdList({ items });
    list.mount(document.body);
    
    const listItems = list.findDownNodes('TypeLi');
    expect(listItems.length).toBe(3);
    expect(listItems[0].textContent).toBe('Item 1');
    expect(listItems[1].textContent).toBe('Item 2');
    expect(listItems[2].textContent).toBe('Item 3');
    
    list.unmount();
  });

  test('应该支持过滤功能', async () => {
    const items = [
      { id: 1, label: 'Apple' },
      { id: 2, label: 'Banana' },
      { id: 3, label: 'Cherry' }
    ];
    
    const list = new TdList({ items, filterText: '' });
    list.mount(document.body);
    
    // 初始显示所有
    expect(list.getItems().length).toBe(3);
    
    // 过滤 'a'
    list.setFilter('a');
    await nextTick();
    
    expect(list.getItems().length).toBe(2); // Apple, Banana
    
    // 过滤 'z'
    list.setFilter('z');
    await nextTick();
    
    expect(list.getItems().length).toBe(0);
    
    list.unmount();
  });

  test('应该支持可见性过滤', async () => {
    const items = [
      { id: 1, label: 'Item 1', visible: true },
      { id: 2, label: 'Item 2', visible: false },
      { id: 3, label: 'Item 3', visible: true }
    ];
    
    const list = new TdList({ items });
    list.mount(document.body);
    
    expect(list.getItems().length).toBe(2); // 只显示可见的
    
    list.unmount();
  });

  test('应该触发 onItemClick 事件', () => {
    const handleItemClick = vi.fn();
    const items = [
      { id: 1, label: 'Item 1' },
      { id: 2, label: 'Item 2' }
    ];
    
    const list = new TdList({ 
      items,
      onItemClick: handleItemClick
    });
    list.mount(document.body);
    
    const listItems = list.findDownNodes('TypeLi');
    (listItems[0] as any).dom.click();
    
    expect(handleItemClick).toHaveBeenCalledTimes(1);
    expect(handleItemClick).toHaveBeenCalledWith(items[0]);
    
    list.unmount();
  });
});
```

---

## 🎯 测试覆盖率要求

### 最低覆盖率标准

| 测试类型 | 最低覆盖率 | 目标覆盖率 | 优先级 |
|---------|-----------|-----------|--------|
| **单元测试** | ≥90% | ≥95% | P0 |
| **集成测试** | ≥70% | ≥85% | P1 |
| **E2E 测试** | ≥50% | ≥80% | P0 |
| **视觉回归** | 0% | ≥60% | P2 |

### 覆盖率检查命令

```bash
# 运行所有测试并生成覆盖率报告
nx test framework --coverage

# 查看 HTML 覆盖率报告
open coverage/index.html

# 检查是否达到覆盖率阈值
nx test framework --coverage.threshold=90
```

---

## 💡 最佳实践

### 1. 测试命名规范

```typescript
// ✅ 好：清晰的测试描述
test('should create component instance successfully', () => {});
test('should apply default type attribute', () => {});
test('should not trigger click when disabled', () => {});

// ❌ 坏：模糊的测试描述
test('test button', () => {});
test('click test', () => {});
```

### 2. 测试结构组织

```typescript
describe('ComponentName', () => {
  describe('Initialization', () => {
    test('should...', () => {});
  });
  
  describe('Props', () => {
    test('should support type prop', () => {});
    test('should support size prop', () => {});
  });
  
  describe('Events', () => {
    test('should emit click event', () => {});
  });
  
  describe('Lifecycle', () => {
    test('should execute hooks in order', () => {});
  });
  
  describe('Cleanup', () => {
    test('should clean up on unmount', () => {});
  });
});
```

### 3. Mock 使用规范

```typescript
// ✅ 好：精确 mock
const handleClick = vi.fn();
const button = new TdButton({ onClick: handleClick });

// ❌ 坏：过度 mock
vi.mock('../Button', () => ({
  TdButton: vi.fn(() => ({}))
}));
```

### 4. 异步测试处理

```typescript
// ✅ 好：正确处理异步
test('should update asynchronously', async () => {
  component.update();
  await nextTick();
  expect(component.value).toBe('updated');
});

// ❌ 坏：没有等待
test('should update asynchronously', () => {
  component.update();
  expect(component.value).toBe('updated'); // 可能失败
});
```

---

## 📚 相关文档

- [BATCH-TEST-GUIDE.md](./BATCH-TEST-GUIDE.md) - batch 测试编写指南
- [BATCH-TEST-FIXES.md](./BATCH-TEST-FIXES.md) - 测试修复报告
- [SIGNALS-API-GUIDE.md](./SIGNALS-API-GUIDE.md) - Signals API 指南

---

**最后更新**: 2026-03-13  
**维护者**: TypeDOM Team  
**许可**: MIT License
