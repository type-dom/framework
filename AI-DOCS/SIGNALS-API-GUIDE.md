# TypeDOM Framework - Signals API Reference

> ⚡ **Framework 中的响应式 API 参考**  
> 📍 @type-dom/framework 项目使用的 Signals API

---

## 📖 概述

本文档包含在 @type-dom/framework 项目中常用的响应式 API，特别是批量更新和作用域管理相关的 API。

### 核心特性

- ✅ **自动依赖追踪** - 无需手动指定依赖
- ✅ **精确更新** - 只更新受影响的组件
- ✅ **批量更新** - 合并多次变更提升性能
- ✅ **作用域管理** - 自动清理防止内存泄漏

---

## ⚡ 批量更新 API

### batch(fn: () => void): void

批量执行更新操作，合并为一次响应式更新。

```typescript
import { signal, batch } from '@type-dom/signals';

const x = signal(0);
const y = signal(0);

effect(() => {
  console.log(`Sum: ${x.get() + y.get()}`);
});

// 不使用 batch - 触发 2 次更新
x.set(1);
y.set(2);

// 使用 batch - 只触发 1 次更新
batch(() => {
  x.set(3);
  y.set(4);
});
```

**使用场景:**
- ✅ 避免多次触发更新
- ✅ 避免中间状态暴露
- ✅ 表单数据批量更新
- ✅ 列表批量操作

**详细文档:** [BATCH-GUIDE.md](./BATCH-GUIDE.md) - 批量更新完全指南

---

### batchEffect(fn: () => void): () => void

结合 `effect` 和 `batch`，追踪依赖且批量更新。

```typescript
import { signal, batchEffect } from '@type-dom/signals';

const count = signal(0);

const stop = batchEffect(() => {
  console.log('Count:', count.get());
  
  // 可以在内部使用 batch
  batch(() => {
    // 批量操作
  });
});

count.set(1);  // 自动重新执行
stop();        // 停止监听
```

**与 effect 的区别:**
- ✅ 内置 batch 支持
- ✅ 更适合复杂更新场景

**注意**: `batchEffect` 的完整文档请参考 [BATCH-GUIDE.md](./BATCH-GUIDE.md)

---

## 🎯 Effect Scope API

### effectScope(fn: () => void): EffectScope

创建独立的作用域，用于组织和管理多个 effects。

```typescript
import { effectScope, onScopeDispose } from '@type-dom/signals';

const scope = effectScope(() => {
  const count = signal(0);
  
  effect(() => {
    console.log('Count:', count.get());
  });
  
  onScopeDispose(() => {
    console.log('Scope 清理');
  });
});

// 停止整个作用域
scope();  // 所有内部的 effect 都会停止
```

**使用场景:**
- ✅ 组件生命周期管理
- ✅ 清理定时器、事件监听器
- ✅ 取消订阅

---

### onScopeDispose(fn: () => void, failSilently?: boolean): void

在 effect scope 停止时自动执行清理操作。

```typescript
import { effectScope, onScopeDispose } from '@type-dom/signals';

effectScope(() => {
  // 定时器
  const timer = setInterval(() => {
    console.log('Tick');
  }, 1000);
  
  // 事件监听
  const handleClick = () => console.log('Click');
  document.addEventListener('click', handleClick);
  
  // 注册清理函数
  onScopeDispose(() => {
    clearInterval(timer);
    document.removeEventListener('click', handleClick);
  });
});
```

**参数:**
- `fn`: 清理回调函数
- `failSilently`: 是否静默失败（没有 active scope 时不报警告）

**详细文档:** [ONSCOPE-DISPOSE-GUIDE.md](./ONSCOPE-DISPOSE-GUIDE.md) - 作用域清理完全指南

---

## 💡 最佳实践

### 1. 选择合适的 API

```typescript
// 基础状态 → signal
const count = signal(0);

// 派生状态 → computed
const double = computed(() => count.get() * 2);

// 副作用 → effect
effect(() => {
  console.log('Count:', count.get());
});

// 精细控制 → watch
watch(count, (newVal) => {
  console.log('Changed:', newVal);
});

// 批量更新 → batch
batch(() => {
  count.set(1);
  double.get();
});
```

### 2. 及时清理资源

```typescript
effectScope(() => {
  const timer = setInterval(() => {}, 1000);
  
  onScopeDispose(() => {
    clearInterval(timer);
  });
});
```

### 3. 使用批量更新优化性能

```typescript
// ❌ 慢
items.set([...items.get(), item1]);
items.set([...items.get(), item2]);
items.set([...items.get(), item3]);

// ✅ 快
batch(() => {
  const current = items.get();
  items.set([...current, item1, item2, item3]);
});
```

---

## 🔗 相关文档

### Framework 库文档
- [AI-README.md](./AI-README.md) - Framework AI文档总索引
- [BATCH-GUIDE.md](./BATCH-GUIDE.md) - 批量更新完全指南 (741 行详细版)
- [ONSCOPE-DISPOSE-GUIDE.md](./ONSCOPE-DISPOSE-GUIDE.md) - 作用域清理完全指南

### Signals 库文档
- [SIGNALS-API-GUIDE.md](../../signals/AI-DOCS/SIGNALS-API-GUIDE.md) - Signals 完整 API 参考
- [AI-README.md](../../signals/AI-DOCS/AI-README.md) - Signals AI文档总索引

---

**最后更新**: 2026-03-13  
**维护者**: TypeDOM Core Team  
**许可**: MIT License
