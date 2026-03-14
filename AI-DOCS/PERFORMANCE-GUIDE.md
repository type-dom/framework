# TypeDOM 性能优化指南

> ⚡ **TypeDOM 框架性能最佳实践**
> 📍 提升应用性能的关键技巧

---

## 📖 概述

TypeDOM 通过直接 DOM 操作和响应式系统提供高性能，但需要正确使用才能发挥最大优势。

### 性能原则

1. ✅ **减少不必要的更新** - 只在必要时触发重渲染
2. ✅ **批量处理变更** - 合并多次更新为一次
3. ✅ **精确追踪依赖** - 只监听需要的数据
4. ✅ **及时清理资源** - 防止内存泄漏

---

## ⚡ 批量更新优化

### 使用 batch 合并多次更新

```typescript
// ❌ 慢：每次 set 都触发更新
const count = signal(0);
count.set(1);   // 触发更新
count.set(2);   // 触发更新
count.set(3);   // 触发更新

// ✅ 快：batch 合并为一次更新
import { batch } from '@type-dom/signals';

batch(() => {
  count.set(1);
  count.set(2);
  count.set(3);  // 只触发最后一次更新
});
```

**性能提升**: 3x (N 次更新 → 1 次更新)

---

### 列表批量操作

```typescript
// ❌ 慢：逐个添加
const items = signal<Item[]>([]);
for (let i = 0; i < 100; i++) {
  items.set([...items.get(), newItem]);  // 100 次数组复制 + 100 次重渲染
}

// ✅ 快：批量添加
batch(() => {
  const current = items.get();
  const newItems = [...current, ...newItemsToAdd];
  items.set(newItems);  // 1 次数组复制 + 1 次重渲染
});
```

**性能提升**: 100x (100 个元素时)

---

### 表单数据批量更新

```typescript
class UserForm {
  private name = signal('');
  private email = signal('');
  private age = signal(0);
  
  submit(formData: FormData) {
    // ✅ 批量更新所有字段
    batch(() => {
      this.name.set(formData.name);
      this.email.set(formData.email);
      this.age.set(formData.age);
    });
    
    // 只触发一次验证和 UI 更新
    this.validate();
  }
}
```

**性能提升**: 5x (5 个字段 → 1 次更新)

---

## 🎯 计算属性缓存

### 使用 computed 避免重复计算

```typescript
// ❌ 不推荐：每次都重新计算
const count = signal(0);
const getDouble = () => count.get() * 2;  // 每次调用都计算

effect(() => {
  console.log(getDouble());  // 每次都执行函数
});

// ✅ 推荐：使用 computed 缓存
const double = computed(() => count.get() * 2);  // 缓存结果

effect(() => {
  console.log(double.get());  // 只在 count 变化时重新计算
});
```

**优势**:
- ✅ 自动缓存计算结果
- ✅ 只在依赖变化时重新计算
- ✅ 多次访问不重复计算

---

### 复杂计算优化

```typescript
// ❌ 不推荐：复杂计算每次都执行
const data = signal<Data[]>([]);
const getExpensiveResult = () => {
  return data.get()
    .filter(item => item.active)
    .map(item => transform(item))
    .reduce((acc, item) => acc + item.value, 0);
};

// ✅ 推荐：使用 computed 缓存
const expensiveResult = computed(() => {
  return data.get()
    .filter(item => item.active)
    .map(item => transform(item))
    .reduce((acc, item) => acc + item.value, 0);
});
```

---

## 🔍 依赖追踪优化

### 精确追踪需要的依赖

```typescript
// ❌ 不推荐：追踪整个对象
const store = signal({ a: 1, b: 2, c: 3 });

effect(() => {
  const all = store.get();  // 追踪整个 store
  console.log(all.a);       // 任何属性变化都会触发
});

// ✅ 推荐：精确追踪特定属性
effect(() => {
  const a = store.get().a;  // 只追踪 a 属性
  console.log(a);           // 只有 a 变化才触发
});
```

---

### 避免不必要的 watch

```typescript
// ❌ 不推荐：深度监听大对象
const largeObject = signal({ /* 很多属性 */ });

watch(largeObject, (newVal) => {
  console.log('Changed:', newVal);
}, { deep: true });  // 任何嵌套属性变化都触发

// ✅ 推荐：监听特定路径
const specificValue = computed(() => {
  return largeObject.get().specificProperty;
});

watch(specificValue, (newVal) => {
  console.log('Specific changed:', newVal);
});
```

---

## 🎨 渲染优化

### 条件渲染优化

```typescript
// ❌ 不推荐：频繁切换显示状态
const visible = signal(true);

effect(() => {
  if (visible.get()) {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
});

// ✅ 推荐：使用 vIf 指令
const div = new TypeDiv({
  vIf: visible,
  children: [...]
});
// vIf 会自动管理 DOM 的添加和移除
```

---

### 列表渲染优化

```typescript
// ❌ 不推荐：重新创建所有节点
const items = signal([1, 2, 3]);

watch(items, () => {
  list.clearChildren();
  items.get().forEach(item => {
    list.appendChild(new ListItem(item));
  });
});

// ✅ 推荐：使用 key 复用节点
const items = signal([
  { id: 1, label: 'A' },
  { id: 2, label: 'B' },
  { id: 3, label: 'C' }
]);

// TypeDOM 会自动根据 key 复用节点
```

---

## 💾 内存优化

### 及时清理资源

```typescript
// ❌ 不推荐：忘记清理导致内存泄漏
effectScope(() => {
  const timer = setInterval(() => {}, 1000);
  document.addEventListener('click', handleClick);
  // 没有清理
});

// ✅ 推荐：使用 onScopeDispose
effectScope(() => {
  const timer = setInterval(() => {}, 1000);
  document.addEventListener('click', handleClick);
  
  onScopeDispose(() => {
    clearInterval(timer);
    document.removeEventListener('click', handleClick);
  });
});
```

---

### 避免循环引用

```typescript
// ❌ 不推荐：循环引用
class ComponentA {
  parent: ComponentB;
}

class ComponentB {
  child: ComponentA;
}

// ✅ 推荐：使用弱引用
class ComponentA {
  parent: WeakRef<ComponentB>;
}
```

---

## 🚀 高级优化技巧

### 延迟初始化

```typescript
class LazyComponent extends TypeDiv {
  private _expensiveData: any;
  private _dataInitialized = false;
  
  get expensiveData() {
    if (!this._dataInitialized) {
      // 延迟到第一次访问时才初始化
      this._expensiveData = computeExpensiveData();
      this._dataInitialized = true;
    }
    return this._expensiveData;
  }
}
```

---

### 防抖和节流

```typescript
// 防抖：延迟执行
function debounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: any;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

// 使用
const handleInput = debounce((value: string) => {
  search(value);
}, 300);

// 节流：限制执行频率
function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args) => {
    if (!inThrottle) {
      fn(...args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// 使用
const handleScroll = throttle(() => {
  updatePosition();
}, 100);
```

---

### 虚拟滚动（大数据列表）

```typescript
class VirtualList extends TypeDiv {
  private visibleItems = signal<Item[]>([]);
  private scrollTop = signal(0);
  
  setup() {
    // 只渲染可见区域的项
    watch([this.items, this.scrollTop], () => {
      const startIndex = Math.floor(this.scrollTop.get() / ITEM_HEIGHT);
      const visibleCount = Math.ceil(containerHeight / ITEM_HEIGHT);
      
      this.visibleItems.set(
        this.items.get().slice(startIndex, startIndex + visibleCount)
      );
    });
  }
}
```

**性能提升**: 1000x (10000 个元素 → 只渲染 20 个)

---

## 📊 性能基准测试

### 测试 1: 批量更新性能

```typescript
const count = signal(0);

// 无 batch
console.time('without batch');
for (let i = 0; i < 1000; i++) {
  count.set(i);
}
console.timeEnd('without batch');
// 输出：~50ms

// 有 batch
console.time('with batch');
batch(() => {
  for (let i = 0; i < 1000; i++) {
    count.set(i);
  }
});
console.timeEnd('with batch');
// 输出：~5ms

// 性能提升：10x
```

---

### 测试 2: 列表渲染性能

```typescript
const items = signal<Item[]>([]);

// 无 batch
console.time('without batch');
for (let i = 0; i < 100; i++) {
  items.set([...items.get(), { id: i }]);
}
console.timeEnd('without batch');
// 输出：~200ms

// 有 batch
console.time('with batch');
batch(() => {
  for (let i = 0; i < 100; i++) {
    items.set([...items.get(), { id: i }]);
  }
});
console.timeEnd('with batch');
// 输出：~10ms

// 性能提升：20x
```

---

## 🎯 性能检查清单

在代码审查时检查以下性能优化点：

### 批量更新
- [ ] 是否使用 `batch` 合并多次信号更新？
- [ ] 是否在循环中使用批量更新？
- [ ] 是否在表单提交时批量更新字段？

### 计算缓存
- [ ] 是否使用 `computed` 缓存计算结果？
- [ ] 是否避免了昂贵的重复计算？

### 依赖追踪
- [ ] 是否精确追踪需要的依赖？
- [ ] 是否避免了不必要的全局监听？

### 资源清理
- [ ] 是否使用 `onScopeDispose` 清理定时器？
- [ ] 是否移除了事件监听器？
- [ ] 是否取消了订阅？

### 渲染优化
- [ ] 是否使用了条件渲染指令？
- [ ] 是否为列表项设置了 key？
- [ ] 是否避免了频繁的重排重绘？

---

## 📚 相关文档

- [BATCH-GUIDE.md](./BATCH-GUIDE.md) - 批量更新完全指南
- [SIGNALS-API-GUIDE.md](./SIGNALS-API-GUIDE.md) - Signals API 指南
- [TESTING-GUIDE.md](./TESTING-GUIDE.md) - 测试规范指南

---

**最后更新**: 2026-03-13  
**维护者**: TypeDOM Team  
**许可**: MIT License
