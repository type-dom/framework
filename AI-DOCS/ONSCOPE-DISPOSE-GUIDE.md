# onScopeDispose - 作用域清理函数

> 🧹 **Effect Scope 资源清理最佳实践**  
> ⚡ 防止内存泄漏的关键工具

---

## 📖 概述

`onScopeDispose` 是 TypeDOM Framework 提供的一个工具函数，用于在 effect scope 被停止时自动执行清理操作。

### 核心作用

1. ✅ **注册清理回调** - 在 scope 停止时自动触发
2. ✅ **防止内存泄漏** - 清理定时器、事件监听器、订阅等
3. ✅ **自动化管理** - 无需手动调用
4. ✅ **错误安全** - 单个清理函数错误不影响其他函数

---

## 🔧 API 定义

```typescript
/**
 * 在当前的 effect scope 上注册一个销毁回调函数
 *
 * @param fn - 要注册的清理回调函数
 * @param failSilently - 是否静默失败（没有 active scope 时不报警告）
 * @returns void
 */
export function onScopeDispose(fn: () => void, failSilently = false): void
```

### 参数说明

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `fn` |`() => void` | - | **必需**，清理回调函数 |
| `failSilently` | `boolean` | `false` | 可选，是否静默失败 |

### 返回值

`void` - 无返回值

---

## 💡 使用场景

### 场景 1: 清理定时器

```typescript
import { effectScope, onScopeDispose, signal } from '@type-dom/framework';

const count = signal(0);

effectScope(() => {
  const timer = setInterval(() => {
    count.set(count.get() + 1);
  }, 1000);

  onScopeDispose(() => {
    clearInterval(timer);
  });
});
```

### 场景 2: 移除事件监听器

```typescript
effectScope(() => {
  const handleClick = (event: MouseEvent) => {
    console.log('Clicked');
  };

  document.addEventListener('click', handleClick);

  onScopeDispose(() => {
    document.removeEventListener('click', handleClick);
  });
});
```

### 场景 3: 取消订阅

```typescript
effectScope(() => {
  const subscription = observable.subscribe(value => {
    console.log('Received:', value);
  });

  onScopeDispose(() => {
    subscription.unsubscribe();
  });
});
```

---

## 🎯 最佳实践

### ✅ 推荐做法

#### 1. 立即注册清理函数

```typescript
// ✅ 推荐
effectScope(() => {
  const timer = setInterval(() => {}, 1000);
  onScopeDispose(() => clearInterval(timer));
});

// ❌ 不推荐
effectScope(() => {
  const timer = setInterval(() => {}, 1000);
  // ... 很多代码之后才注册
  onScopeDispose(() => clearInterval(timer));
});
```

#### 2. 可以注册多个清理函数

```typescript
effectScope(() => {
  const timer1 = setInterval(() => {}, 1000);
  const timer2 = setInterval(() => {}, 2000);
  
  onScopeDispose(() => clearInterval(timer1));
  onScopeDispose(() => clearInterval(timer2));
});
```

#### 3. 注意清理顺序

```typescript
effectScope(() => {
  const ws = new WebSocket('ws://localhost');
  const timer = setInterval(() => ws.send('ping'), 1000);
  
  // 后注册的先执行，所以 timer 会先清理
  onScopeDispose(() => {
    console.log('清理 timer');
    clearInterval(timer);
  });
  
  onScopeDispose(() => {
    console.log('清理 WebSocket');
    ws.close();
  });
});
```

---

## ⚠️ 注意事项

### 1. 必须在 effectScope 内使用

```typescript
// ❌ 错误：不在 scope 内使用
onScopeDispose(() => {
  console.log('This will fail');
});

// ✅ 正确
effectScope(() => {
  onScopeDispose(() => {
    console.log('This works');
  });
});
```

### 2. 清理函数应该是同步的

```typescript
// ✅ 推荐
onScopeDispose(() => {
  clearInterval(timer);
  document.removeEventListener('click', handler);
});

// ❌ 不推荐
onScopeDispose(async () => {
  await someAsyncCleanup();  // 异步清理可能不会按预期工作
});
```

---

## 📚 相关文档

### Framework 库文档
- [AI-README.md](./AI-README.md) - Framework AI文档总索引
- [SIGNALS-API-GUIDE.md](./SIGNALS-API-GUIDE.md) - Signals API 参考
- [BATCH-GUIDE.md](./BATCH-GUIDE.md) - 批量更新指南

### 相关库文档
- [Signals 文档](../../signals/AI-DOCS/AI-README.md)
- [Hooks 文档](../../hooks/AI-DOCS/AI-README.md)

---

**最后更新**: 2026-03-13  
**维护者**: TypeDOM Core Team  
**许可**: MIT License
