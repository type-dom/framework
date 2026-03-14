# TypeDOM 常见错误示例

> ⚠️ **避免这些常见陷阱**
> 📍 从错误中学习的最佳实践

---

## 📖 概述

本文档收集了 TypeDOM 开发中的常见错误和反模式，帮助开发者避免踩坑。

### 错误分类

1. 🔴 **Hook 使用错误** - Hook 调用时机和位置
2. 🔴 **响应式错误** - Signals 使用不当
3. 🔴 **生命周期错误** - 钩子函数误用
4. 🔴 **Fragment/Teleport 错误** - 特殊组件处理
5. 🔴 **内存泄漏** - 资源未清理
6. 🔴 **命名规范错误** - 违反命名约定

---

## 🔴 Hook 使用错误

### 错误 1: 在 setup 外部调用 Hook

```typescript
// ❌ 错误：在 setup 外部调用 Hook
const ns = useNamespace('button');  // ❌ 这会在类定义时执行

export class TdButton extends TypeDiv {
  setup() {
    // ...
  }
}

// ✅ 正确：在 setup 内部调用
export class TdButton extends TypeDiv {
  setup() {
    const ns = useNamespace('button');  // ✅ 在 setup 内部
    // ...
  }
}
```

**原因**: Hooks 必须在组件实例化后调用，setup 是正确的时机。

---

### 错误 2: 条件调用 Hook

```typescript
// ❌ 错误：条件调用 Hook
setup() {
  if (this.props.type === 'primary') {
    useNamespace('button');  // ❌ 违反 Rules of Hooks
  }
}

// ✅ 正确：始终调用
setup() {
  const ns = useNamespace('button');  // ✅ 总是调用
  if (this.props.type === 'primary') {
    // 使用 ns 应用样式
  }
}
```

**原因**: Hooks 必须按顺序调用，条件调用会破坏调用栈。

---

### 错误 3: 在构造函数中调用 Hook

```typescript
// ❌ 错误：在构造函数中调用
export class TdButton extends TypeDiv {
  constructor(params = {}) {
    super(params);
    const ns = useNamespace('button');  // ❌ 太早了
  }
}

// ✅ 正确：在 setup 中调用
export class TdButton extends TypeDiv {
  setup() {
    const ns = useNamespace('button');  // ✅ 正确的时机
  }
}
```

**原因**: 构造函数中实例还未完全初始化。

---

## 🔴 响应式错误

### 错误 4: 直接修改数组/对象

```typescript
// ❌ 错误：直接修改不会触发更新
const items = signal([1, 2, 3]);
items.get().push(4);  // ❌ 不会触发响应式更新
console.log(items.get());  // [1, 2, 3, 4] - 但 UI 不更新

// ✅ 正确：创建新数组
const items = signal([1, 2, 3]);
items.set([...items.get(), 4]);  // ✅ 触发更新
console.log(items.get());  // [1, 2, 3, 4] - UI 也更新
```

**解决方案**: 总是创建新的数组/对象引用。

---

### 错误 5: 滥用响应式

```typescript
// ❌ 错误：所有东西都响应式
class TdComponent extends TypeDiv {
  setup() {
    this.everything = signal({});  // ❌ 过度使用
    this.uid = signal(generateId());  // ❌ 不需要响应式
    this.config = signal(defaultConfig);  // ❌ 配置不需要响应式
  }
}

// ✅ 正确：只对需要响应的数据使用
class TdComponent extends TypeDiv {
  private uid: string;
  private config: Config;
  
  setup() {
    this.uid = generateId();  // ✅ 普通属性
    this.config = defaultConfig;  // ✅ 普通属性
    this.count = signal(0);  // ✅ 需要响应式
  }
}
```

**原则**: 只对需要触发 UI 更新的数据使用响应式。

---

### 错误 6: 在 effect 中使用 async/await

```typescript
// ❌ 错误：effect 中直接使用 async/await
effect(async () => {
  const data = await fetchData();  // ❌ 不会追踪依赖
  console.log(data);
});

// ✅ 正确：在 effect 外处理异步
const data = signal(null);

effect(() => {
  fetchData()
    .then(result => data.set(result));  // ✅ 在 then 中设置
});

// 或者使用 watch
watch(source, async (newVal) => {
  const result = await fetchData(newVal);
  data.set(result);
});
```

**原因**: effect 不支持 async 函数，会破坏依赖追踪。

---

## 🔴 生命周期错误

### 错误 7: 在错误的生命周期访问 DOM

```typescript
// ❌ 错误：在 created 中访问 DOM
created() {
  this.dom.innerHTML = 'test';  // ❌ DOM 还未挂载
}

// ✅ 正确：在 mounted 中访问 DOM
mounted() {
  this.dom.innerHTML = 'test';  // ✅ DOM 已就绪
}
```

**生命周期顺序**:
```
beforeCreate → created → beforeMount → mounted → updated → beforeUnmount → unmounted
```

---

### 错误 8: 忘记清理资源

```typescript
// ❌ 错误：没有清理定时器
setup() {
  const timer = setInterval(() => {
    console.log('tick');
  }, 1000);
}

unmount() {
  super.unmount();
  // ❌ 定时器还在运行！
}

// ✅ 正确：及时清理
private timer: number | undefined;

setup() {
  this.timer = setInterval(() => {
    console.log('tick');
  }, 1000);
}

unmount() {
  if (this.timer !== undefined) {
    clearInterval(this.timer);
  }
  super.unmount();
}
```

---

### 错误 9: 在 unmounted 后继续访问组件

```typescript
// ❌ 错误：异步回调中访问已卸载的组件
setup() {
  fetch('/api/data')
    .then(res => res.json())
    .then(data => {
      this.updateData(data);  // ❌ 可能组件已经卸载
    });
}

// ✅ 正确：检查组件状态
setup() {
  let cancelled = false;
  
  fetch('/api/data')
    .then(res => res.json())
    .then(data => {
      if (!cancelled) {
        this.updateData(data);  // ✅ 先检查
      }
    });
  
  onBeforeUnmount(() => {
    cancelled = true;
  });
}
```

---

## 🔴 Fragment 错误

### 错误 10: 直接访问 fragment.dom

```typescript
// ❌ 错误：fragment.dom 是 DocumentFragment
const fragment = new Fragment();
fragment.dom.innerHTML = 'test';  // ❌ DocumentFragment 不支持 innerHTML

// ✅ 正确：通过 addChild 添加子节点
const fragment = new Fragment();
fragment.appendChild(new TypeDiv({ children: ['test'] }));

// ✅ 正确：通过 anchorStart 和 anchor 定位
console.log(fragment.anchorStart);
console.log(fragment.anchor);
```

**重要**: Fragment 的 dom 是 DocumentFragment，不是普通 Element。

---

### 错误 11: Fragment 清理时移除锚点

```typescript
// ❌ 错误：移除了必要的锚点
unmount() {
  this.clearChildren();  // ❌ 这会移除锚点
  super.unmount();
}

// ✅ 正确：保留锚点
unmount() {
  this.clearChildrenDom();  // ✅ 只清理 DOM，保留锚点
  super.unmount();
}
```

---

## 🔴 Teleport 错误

### 错误 12: Teleport 未清理

```typescript
// ❌ 错误：Teleport 没有清理
export class TdModal extends TypeDiv {
  private teleport!: Teleport;
  
  setup() {
    this.teleport = new Teleport({
      to: 'body',
      slot: () => [...]
    });
  }
  
  unmount() {
    super.unmount();
    // ❌ Teleport 还在 body 中！
  }
}

// ✅ 正确：清理 Teleport
unmount() {
  if (this.teleport) {
    this.teleport.unmount();  // ✅ 清理 Teleport
  }
  super.unmount();
}
```

---

### 错误 13: Teleport 和 vIf 组合时的错误处理

```typescript
// ❌ 错误：没有处理两种状态
const modal = new Teleport({
  to: 'body'
});
modal.vIf = visible;  // ❌ 需要特殊处理

// ✅ 正确：确保正确配合
const modal = new Teleport({
  to: 'body',
  vIf: visible  // ✅ 在 props 中设置
});
```

---

## 🔴 内存泄漏

### 错误 14: 事件监听器未移除

```typescript
// ❌ 错误：没有移除事件监听器
setup() {
  document.addEventListener('click', this.handleClick);
}

unmount() {
  super.unmount();
  // ❌ 事件监听器还在！
}

// ✅ 正确：移除监听器
setup() {
  this.handleClick = this.handleClick.bind(this);
  document.addEventListener('click', this.handleClick);
}

unmount() {
  document.removeEventListener('click', this.handleClick);
  super.unmount();
}
```

---

### 错误 15: 订阅未取消

```typescript
// ❌ 错误：订阅没有取消
setup() {
  observable.subscribe(data => {
    this.update(data);
  });
}

// ✅ 正确：保存订阅并取消
private subscription: Subscription | undefined;

setup() {
  this.subscription = observable.subscribe(data => {
    this.update(data);
  });
}

unmount() {
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
  super.unmount();
}
```

---

## 🔴 命名规范错误

### 错误 16: 组件名缺少 Td 前缀

```typescript
// ❌ 错误
export class Button extends TypeDiv { }
export class Input extends TypeInput { }

// ✅ 正确
export class TdButton extends TypeDiv { }
export class TdInput extends TypeInput { }
```

---

### 错误 17: CSS 类名不使用 BEM

```typescript
// ❌ 错误
this.classList.add('button-primary');
this.classList.add('buttonLarge');

// ✅ 正确
const ns = useNamespace('button');
this.classList.add(ns.b());              // td-button
this.classList.add(ns.m('primary'));     // td-button--primary
this.classList.add(ns.m('large'));       // td-button--large
```

---

## 💡 如何避免错误

### 1. 使用 TypeScript 严格模式

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true
  }
}
```

### 2. 遵循检查清单

参考 [AI-CODE-CHECKLIST.md](./AI-CODE-CHECKLIST.md) 进行代码审查。

### 3. 编写测试

为关键功能编写测试，防止回归。

### 4. Code Review

团队成员互相审查代码，发现潜在问题。

---

## 📚 相关文档

- [AI-CODE-CHECKLIST.md](./AI-CODE-CHECKLIST.md) - 代码检查清单
- [COMPONENT-TEMPLATE.md](./COMPONENT-TEMPLATE.md) - 组件开发模板
- [CODING-RULES.md](./CODING-RULES.md) - 编码规范
- [PERFORMANCE-GUIDE.md](./PERFORMANCE-GUIDE.md) - 性能优化指南

---

**最后更新**: 2026-03-13  
**维护者**: TypeDOM Team  
**许可**: MIT License
