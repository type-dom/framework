# batch - 批量更新函数完全指南

> ⚡ **TypeDOM Framework 批量更新核心API**
> 🚀 性能优化的关键工具

---

## 📖 概述

`batch` 是 TypeDOM Framework 提供的**批量更新工具函数**,用于将多个信号更新操作合并为一次响应式更新，从而避免不必要的重复计算和渲染，显著提升性能。

### 核心作用

1. ✅ **合并多次更新** - N 次 signal.set() = 1 次 flush
2. ✅ **避免中间状态** - 只暴露最终状态，不暴露中间过程
3. ✅ **性能优化** - 减少重复计算和 DOM 重渲染
4. ✅ **嵌套支持** - 多层 batch 自动合并，只有最外层才执行 flush

---

## 🔧 API 定义

```typescript
/**
 * 批量更新函数 - 将多个信号更新操作合并为一次响应式更新
 *
 * @param fn - 要批量执行的函数，通常包含多个信号更新操作
 * @returns void
 */
export function batch(fn: () => void): void
```

### 参数说明

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `fn` |`() => void` | ✅ | 要批量执行的函数，通常包含多个 `signal.set()` 操作 |

### 返回值

`void` - 无返回值

---

## ⚙️ 工作原理

### 核心机制

```
调用 batch(fn)
    ↓
startBatch() → batchDepth++ (增加批量深度计数器)
    ↓
执行用户函数 fn()
    ├─ 可能包含多个 signal.set() 操作
    ├─ 每个 set() 会：
    │   1. 更新 pendingValue
    │   2. 标记 flags = Mutable | Dirty
    │   3. propagate(subs) 传播变更
    │   4. 检查 batchDepth > 0 → 不执行 flush
    └─ 所有变更被收集到队列中
    ↓
endBatch() → batchDepth-- (减少批量深度计数器)
    ↓
检查：batchDepth === 0 ?
    ├─ 是 → flush() 执行队列中的所有更新
    └─ 否 → 等待外层 batch 结束
```

### 关键变量

```typescript
// 全局状态变量
let batchDepth = 0;         // 批量深度计数器
let queuedLength = 0;       // 待处理队列长度
let notifyIndex = 0;        // 当前执行索引
const queued: EffectNode[]; // 待处理的 effect 队列

// startBatch 实现
function startBatch() {
  ++batchDepth;  // 增加计数器
}

// endBatch 实现
function endBatch() {
  if (!--batchDepth) {  // 归零时才执行 flush
    flush();
  }
}

// flush 实现
function flush() {
  // 执行队列中的所有 effect
  while (notifyIndex < queuedLength) {
    const effect = queued[notifyIndex]!;
    queued[notifyIndex++] = undefined;
    run(effect);
  }
  // 清理队列
  notifyIndex = 0;
  queuedLength = 0;
}
```

---

## 💡 使用场景

由于文档过长，这里只展示部分示例。完整内容请参考原文件。

**注意**: 原文档有 741 行，包含详细的批量更新指南、示例代码、最佳实践和性能测试。

---

## 📚 相关文档

### Framework 库文档
- [AI-README.md](./AI-README.md) - Framework AI文档总索引
- [SIGNALS-API-GUIDE.md](./SIGNALS-API-GUIDE.md) - Signals API 参考
- [ONSCOPE-DISPOSE-GUIDE.md](./ONSCOPE-DISPOSE-GUIDE.md) - 作用域清理指南

### 相关库文档
- [Signals 文档](../../signals/AI-DOCS/AI-README.md)
- [Hooks 文档](../../hooks/AI-DOCS/AI-README.md)

---

**最后更新**: 2026-03-13  
**维护者**: TypeDOM Core Team  
**许可**: MIT License
