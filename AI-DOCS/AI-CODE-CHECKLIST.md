# TypeDOM Framework - AI 修改代码检查清单

> 帮助 AI 在修改 TypeDOM 框架代码时避免常见错误，确保代码质量和一致性

---

## 📋 通用检查清单

### ✅ 创建新类时

- [ ] 是否继承了正确的基类（TypeNode/TypeElement/TypeFragment）？
- [ ] 是否定义了 `className` 属性并赋值？
- [ ] 构造函数是否调用了 `super(params)`？
- [ ] 是否实现了抽象方法（如 `mount()`, `render()`）？
- [ ] interface 文件是否同步更新？
- [ ] index.ts 是否导出？

**示例**:
```typescript
// ✅ 正确
export class MyComponent extends TypeElement {
  className: 'MyComponent';
  
  constructor(params = {}) {
    super(params);
    this.className = 'MyComponent';
  }
}

// ❌ 错误 - 忘记 className
export class MyComponent extends TypeElement {
  constructor(params) {
    super(params);
    // 缺少 className
  }
}
```

### ✅ 添加子节点时

- [ ] 是否使用 `addChild()` 或 `appendChild()` 方法？
- [ ] 是否需要设置 `scopedId`？
- [ ] 是否需要设置 `parent`？
- [ ] 是否是重复添加同一个节点（需要 clone）？
- [ ] 动态添加的节点是否需要重新渲染？

### ✅ 使用 Fragment 时

- [ ] 是否知道 `fragment.dom` 是 `DocumentFragment`？
- [ ] 是否避免直接访问 `fragment.dom.innerHTML`？
- [ ] 是否使用 `anchorStart` 和 `anchor` 定位？
- [ ] 清理时是否注意保留锚点？
- [ ] 子节点中有 Teleport 时是否特殊处理？

### ✅ 使用 Teleport 时

- [ ] 是否设置了 `to` 属性（目标容器）？
- [ ] 是否创建了 `targetStart` 和 `targetAnchor`？
- [ ] mount 时是否将子节点插入到目标容器？
- [ ] unmount 时是否清理了 targetStart/targetAnchor 之间的内容？
- [ ] 是否清理了标记节点本身？

### ✅ 使用 vIf 时

- [ ] 是否创建了 `anchor` 占位符？
- [ ] condition 为 false 时是否保留了 anchor？
- [ ] Fragment 和非 Fragment 的处理是否正确区分？
- [ ] 多层嵌套时是否有问题？
- [ ] Teleport + vIf 组合时是否都处理了？

### ✅ 设置响应式时

- [ ] 是否使用了 `signal()` 创建响应式变量？
- [ ] 是否使用 `watch()` 监听变化？
- [ ] 变化时是否需要调用 `render()`？
- [ ] 计算属性是否使用 `computed()`？
- [ ] 是否避免了不必要的响应式（性能优化）？

### ✅ 生命周期钩子

- [ ] 是否在正确的时机执行逻辑？
- [ ] beforeCreate/created中是否避免访问dom？
- [ ] mounted 中是否可以安全访问 DOM？
- [ ] unmounted 中是否清理了资源（事件监听器等）？
- [ ] 是否调用了父类钩子（如果需要）？

### ✅ 事件处理

- [ ] 是否使用 `addEmits()` 注册事件？
- [ ] 是否使用 `this.emit()` 触发事件？
- [ ] 事件监听器是否在 unmount 时清理？
- [ ] 是否避免内存泄漏（特别是全局事件）？

### ✅ 样式和属性

- [ ] 是否使用 `setAttrObj()` / `setStyleObj()`？
- [ ] 是否需要响应式样式？
- [ ] 是否注意 scopedId 的作用域？
- [ ] 动态 class 如何处理？

### ✅ 清理子节点时

- [ ] 是否同时清理 DOM 和 childNodes 数组？
- [ ] 是否区分 setup 中添加的和普通子节点？
- [ ] Fragment 的清理是否特殊处理？
- [ ] 子节点的 unmount 是否调用？

---

## 🔍 特殊场景检查

### 场景 1: 动态组件
### 场景 2: 列表渲染 (List 组件)
### 场景 3: 插槽 (Slot)
### 场景 4: KeepAlive

---

## 🐛 常见 Bug 检查表

### Bug 类型 1: DOM 未挂载
### Bug 类型 2: 响应式不更新
### Bug 类型 3: 内存泄漏
### Bug 类型 4: Fragment 渲染异常
### Bug 类型 5: scopedId 丢失

---

## 📝 代码审查 Checklist

### 结构完整性
### 功能正确性
### 性能优化
### 代码质量
### 安全性

---

## 🎯 AI 自检问题

在提交代码前，AI 应该问自己：

1. **这个修改是否破坏了现有的继承链？**
2. **是否会影响其他组件的正常工作？**
3. **生命周期钩子的调用时机是否正确？**
4. **Fragment 和 Teleport 是否特殊处理了？**
5. **响应式更新是否能正常触发？**
6. **卸载时资源是否清理干净？**
7. **scopedId 和作用域是否正确？**
8. **是否有潜在的内存泄漏？**
9. **性能是否有明显影响？**
10. **是否有更好的实现方式？**

---

## 📚 相关文档

- **主文档**: AI-OPTIMIZATION-GUIDE.md - 详细概念和原理
- **速查卡**: QUICK-REFERENCE.md - 快速 API 参考
- **本文档**: AI-CODE-CHECKLIST.md - 代码修改检查清单

---

**版本**: 1.0  
**创建时间**: 2026-03-11  
**适用范围**: TypeDOM Framework 代码修改  
**维护**: AI Assistant
