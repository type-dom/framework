# TypeDOM Framework - AI 快速参考卡

> 一页纸速查表，帮助 AI 快速操作 TypeDOM 框架

---

## 🚀 核心类继承关系

```
TypeNode (抽象基类)
  ├─ TypeElement (元素节点)
  │   ├─ TypeFragment (片段)
  │   │   └─ Teleport (传送门)
  │   ├─ TypeHTML (HTML 元素基类)
  │   │   ├─ Div, Span, A, LI... (具体 HTML 标签)
  │   │   └─ ... (87 个 HTML 元素)
  │   └─ TypeSvg (SVG 元素基类)
  │       └─ Svg, Circle, Path... (19 个 SVG 元素)
  └─ TextNode (文本节点)
```

---

## 📦 创建组件的 3 种方式

### 方式 1: 使用现有组件
```typescript
const div = new Div({
  attrObj: { id: 'my-id' },
  styleObj: { color: 'red' },
  children: ['Hello']
});
```

### 方式 2: 继承TypeElement
```typescript
class MyComponent extends TypeElement {
  className: 'MyComponent';
  
  constructor(params = {}) {
    super(params);
    this.className = 'MyComponent';
  }
  
  setup() {
    // 初始化逻辑
  }
}
```

### 方式 3: 使用 Fragment
```typescript
const fragment = new Fragment({
  children: [
    new Div({ children: ['A'] }),
    new Div({ children: ['B'] })
  ]
});
```

---

## 🔧 常用 API 速查

### 添加子节点
```typescript
parent.addChild(child)              // 添加
parent.appendChild(child)           // 添加并渲染
parent.unshiftChild(child)          // 从前面添加
parent.insertChild(child, index)    // 指定位置插入
```

### 设置属性
```typescript
component.setAttrObj({ id: 'x' })   // 设置 HTML 属性
component.setStyleObj({ color: 'r' }) // 设置样式
component.props.xxx = value         // 直接修改 props
```

### 查找节点
```typescript
parent.findChildNode('ClassName')   // 查找第一个
parent.findChildNodes('ClassName')  // 查找所有
parent.findDownNodes('ClassName')   // 递归查找后代
node.down('expr', value)            // 向下查找
node.up('ClassName')                // 向上查找
```

### 清理节点
```typescript
parent.clearChildren()              // 清理所有子节点
parent.clearChildrenDom()           // 清理 DOM
parent.clearSetupChildNodes()       // 清理 setup 中添加的
```

---

## 🎯 生命周期钩子

```typescript
class MyComp extends TypeElement {
  beforeCreate() { }      // 渲染前
  created() { }           // 实例创建完成
  beforeMount() { }       // 挂载前
  mounted() { }           // 挂载后
  beforeUpdate() { }      // 更新前
  updated() { }           // 更新后
  beforeUnmount() { }     // 卸载前
  unmounted() { }         // 卸载后
}
```

---

## ⚡ 响应式 (Signals)

```typescript
import { signal, computed, watch } from '@type-dom/signals';

const count = signal(0);           // 创建信号
const val = count();               // 读取值
count.set(5);                      // 设置值

const double = computed(() => count() * 2);  // 计算属性

watch(count, (newVal, oldVal) => {           // 监听变化
  console.log('changed:', newVal);
});
```

---

## 🎭 条件渲染 (vIf)

```typescript
// 静态条件
const div = new Div({ vIf: true, children: [...] });

// 动态条件
const visible = signal(true);
const div = new Div({ 
  vIf: visible, 
  children: [...] 
});

visible.set(false);  // 切换显示
```

---

## 📦 Fragment 使用要点

```typescript
const fragment = new Fragment();

// ✅ 正确用法
fragment.addChild(child1);
fragment.addChild(child2);

// ❌ 错误用法
fragment.dom.innerHTML = '...';  // DocumentFragment 不支持!

// 结构
<!--[Fragment - uid]-->     ← anchorStart
  <!-- 子节点 -->
<!--[Fragment - uid]]-->    ← anchor
```

---

## 🚪 Teleport 传送门

```typescript
const teleport = new Teleport({
  to: 'body',  // 目标容器
  slot: () => [
    new Div({ children: ['Modal'] })
  ]
});

// 关键属性
teleport.target        // 目标 DOM
teleport.targetStart   // 起始标记
teleport.targetAnchor  // 结束标记
```

---

## 🔍 调试技巧

```typescript
// 检查类型
console.log('className:', node.className);
console.log('dom type:', node.dom.constructor.name);

// 检查关系
console.log('parent:', node.parent?.className);
console.log('children:', node.children.map(c => c.className));

// 检查 DOM
console.log('in DOM?', document.contains(node.dom));

// 检查状态
console.log('isMounted:', node.isMounted);
console.log('isRendered:', node.isRendered);
```

---

## ⚠️ 常见陷阱

### 陷阱 1: Fragment 的 dom
```typescript
// ❌ 错误
fragment.dom.innerHTML = 'x';

// ✅ 正确
fragment.addChild(new Div());
```

### 陷阱 2: 重复添加节点
```typescript
// ❌ 错误
parent1.addChild(child);
parent2.addChild(child);

// ✅ 正确
parent1.addChild(child);
parent2.addChild(child.clone());
```

### 陷阱 3: Teleport 清理
```typescript
// ✅ 必须清理
unmount() {
  removeBetween(this.targetStart, this.targetAnchor);
  this.targetStart.remove();
  this.targetAnchor.remove();
}
```

### 陷阱 4: scopedId 传递
```typescript
// ✅ 确保传递
addChild(child) {
  if (this.scopedId) {
    child.scopedId = this.scopedId;
    addAttrProp(child, child.scopedId, '');
  }
}
```

---

## 🏷️ 命名空间

| 模块 | 导入路径 |
|------|---------|
| Core | `@type-dom/framework/core` |
| DOM | `@type-dom/framework/dom` |
| Signals | `@type-dom/signals` |
| Utils | `@type-dom/utils` |
| HTML 元素 | `@type-dom/framework/dom/components/html-element/*` |
| SVG 元素 | `@type-dom/framework/dom/components/svg-element/*` |

---

## 📋 快速检查清单

在修改代码前，AI 应该检查：

- [ ] 是否调用了 `super(params)`？
- [ ] `className` 是否正确设置？
- [ ] 是否需要 `setup()` 方法？
- [ ] 子节点如何添加？
- [ ] 是否需要响应式？
- [ ] 是否涉及 Fragment/Teleport？
- [ ] 生命周期钩子是否需要？
- [ ] 事件如何处理？
- [ ] 样式和属性如何设置？
- [ ] 卸载时是否需要清理？

---

## 💡 最佳实践口诀

```
构造先调 super，className 别忘记
子节点用 addChild，不要直接操作数组
Fragment 特殊对待，DocumentFragment 不是 Element
Teleport 要清理，targetStart 和 Anchor
响应式用 signals，watch 监听变化
生命周期按顺序，资源清理在 unmount
```

---

**版本**: 1.0  
**更新时间**: 2026-03-11  
**配合文档**: AI-OPTIMIZATION-GUIDE.md
