# TypeDOM 组件开发模板

> 🎨 **标准组件开发指南**
> 📍 Class + Hooks + Const 三位一体模式

---

## 📖 概述

TypeDOM 采用 **Class + Hooks + Const** 三位一体的组件开发模式，完全面向对象设计。

### 核心模式

```typescript
/**
 * 1. Interface 定义 Props
 */
interface ComponentProps extends HtmlProps {
  // 属性定义
}

/**
 * 2. Const 定义默认值和配置
 */
const defaultConfigs: ComponentProps = {
  // 默认值
};

/**
 * 3. Class 实现组件逻辑
 */
export class TdComponentName extends TypeHtml<ComponentProps> {
  className = 'TdComponentName';
  
  constructor(params = {}) {
    super(params);
    defaultProps(this, defaultConfigs);
  }
  
  override setup() {
    // 使用 Hooks 初始化
  }
}
```

---

## 📝 基础组件模板

### 模板 1: 简单按钮组件

```typescript
/**
 * @module TD.ui.Button
 * @extends TypeHtml
 * @description 基础按钮组件
 */

import { addAttrClass, TypeHtml } from '@type-dom/framework';
import { useNamespace } from '@type-dom/hooks';

/**
 * Button Props Interface
 */
interface ButtonProps extends HtmlProps {
  type?: 'primary' | 'default' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: MouseEvent) => void;
  children?: string | TypeNode;
}

/**
 * Default Props
 */
const defaultConfigs: ButtonProps = {
  type: 'default',
  size: 'medium',
  disabled: false,
  loading: false
};

/**
 * Button Component
 */
export class TdButton extends TypeHtml<ButtonProps> {
  className = 'TdButton';

  constructor(params = {}) {
    super(params);
    defaultProps(this, defaultConfigs);
  }

  override setup() {
    const ns = useNamespace('button');

    // 添加基础类名
    addAttrClass(this, ns.b());
    addAttrClass(this, ns.m(this.props.type!));
    addAttrClass(this, ns.m(this.props.size!));

    // 处理禁用状态
    if (this.props.disabled) {
      this.setAttribute('disabled', '');
      addAttrClass(this, ns.m('disabled'));
    }

    // 处理加载状态
    if (this.props.loading) {
      addAttrClass(this, ns.m('loading'));
      this.appendChild(new TypeSpan({ children: ['Loading...'] }));
    } else if (this.props.children) {
      this.appendChild(this.props.children);
    }

    // 事件处理
    this.on('click', this.handleClick.bind(this));
  }

  handleClick(event: MouseEvent) {
    if (this.props.disabled || this.props.loading) {
      return;
    }

    this.emit('click', event);
    this.props.onClick?.(event);
  }
}
```

---

### 模板 2: 响应式计数器组件

```typescript
/**
 * @module TD.ui.Counter
 * @extends TypeHtml
 * @description 响应式计数器组件
 */

import { TypeHtml, TypeDiv, TypeButton, TypeSpan } from '@type-dom/framework';
import { useNamespace } from '@type-dom/hooks';
import { signal, computed, effect } from '@type-dom/signals';

/**
 * Counter Props Interface
 */
interface CounterProps {
  initialValue?: number;
  step?: number;
  min?: number;
  max?: number;
  onChange?: (value: number) => void;
}

/**
 * Default Props
 */
const defaultProps: CounterProps = {
  initialValue: 0,
  step: 1,
  min: -Infinity,
  max: Infinity
};

/**
 * Counter Component
 */
export class TdCounter extends TypeDiv<CounterProps> {
  className = 'TdCounter';
  private count!: ReturnType<typeof signal<number>>;
  private canDecrement!: ReturnType<typeof computed>;
  private canIncrement!: ReturnType<typeof computed>;

  constructor(params = {}) {
    super(params);
    defaultProps(this);
  }

  setup() {
    const ns = useNamespace('counter');
    
    // 初始化响应式状态
    this.count = signal(this.props.initialValue!);
    this.canDecrement = computed(() => 
      this.count.get() > this.props.min!
    );
    this.canIncrement = computed(() => 
      this.count.get() < this.props.max!
    );
    
    // 添加样式
    addAttrClass(this, ns.b());
    
    // 构建 DOM 结构
    this.buildStructure(ns);
    
    // 监听变化
    this.setupWatcher();
  }
  
  private buildStructure(ns: ReturnType<typeof useNamespace>) {
    // 减少按钮
    const decrementBtn = new TypeButton({
      attrObj: { disabled: !this.canDecrement.get() },
      children: ['-']
    });
    decrementBtn.classList.add(ns.e('button'), ns.em('button', 'decrement'));
    decrementBtn.on('click', this.decrement.bind(this));
    
    // 计数显示
    this.displaySpan = new TypeSpan({
      children: [String(this.count.get())]
    });
    this.displaySpan.classList.add(ns.e('display'));
    
    // 增加按钮
    const incrementBtn = new TypeButton({
      attrObj: { disabled: !this.canIncrement.get() },
      children: ['+']
    });
    incrementBtn.classList.add(ns.e('button'), ns.em('button', 'increment'));
    incrementBtn.on('click', this.increment.bind(this));
    
    // 添加子节点
    this.appendChild(decrementBtn);
    this.appendChild(this.displaySpan);
    this.appendChild(incrementBtn);
  }
  
  private setupWatcher() {
    effect(() => {
      const value = this.count.get();
      this.displaySpan.textContent = String(value);
      this.props.onChange?.(value);
    });
    
    effect(() => {
      const buttons = this.findDownNodes('TypeButton');
      const [decrementBtn, incrementBtn] = buttons;
      
      if (decrementBtn) {
        (decrementBtn as any).setAttribute('disabled', !this.canDecrement.get());
      }
      
      if (incrementBtn) {
        (incrementBtn as any).setAttribute('disabled', !this.canIncrement.get());
      }
    });
  }
  
  increment() {
    if (this.canIncrement.get()) {
      this.count.set(this.count.get() + this.props.step!);
    }
  }
  
  decrement() {
    if (this.canDecrement.get()) {
      this.count.set(this.count.get() - this.props.step!);
    }
  }
  
  getValue(): number {
    return this.count.get();
  }
  
  setValue(value: number) {
    this.count.set(value);
  }
}
```

---

### 模板 3: 条件渲染列表组件

```typescript
/**
 * @module TD.ui.List
 * @extends TypeHtml
 * @description 条件渲染列表组件
 */

import { 
  TypeHtml, 
  TypeUl, 
  TypeLi,
  TypeFragment,
  vIf 
} from '@type-dom/framework';
import { useNamespace } from '@type-dom/hooks';
import { signal, computed } from '@type-dom/signals';

/**
 * List Item Interface
 */
interface ListItem {
  id: string | number;
  label: string;
  visible?: boolean;
}

/**
 * List Props Interface
 */
interface ListProps {
  items?: ListItem[];
  filterText?: string;
  onItemClick?: (item: ListItem) => void;
}

/**
 * Default Props
 */
const defaultProps: ListProps = {
  items: [],
  filterText: ''
};

/**
 * List Component
 */
export class TdList extends TypeUl<ListProps> {
  className = 'TdList';
  private filteredItems!: ReturnType<typeof computed<ListItem[]>>;

  constructor(params = {}) {
    super(params);
    defaultProps(this);
  }

  setup() {
    const ns = useNamespace('list');
    
    // 计算过滤后的列表
    this.filteredItems = computed(() => {
      const items = this.props.items || [];
      const filter = (this.props.filterText || '').toLowerCase();
      
      return items.filter(item => {
        const matchesFilter = item.label.toLowerCase().includes(filter);
        const isVisible = item.visible !== false;
        return matchesFilter && isVisible;
      });
    });
    
    // 添加样式
    addAttrClass(this, ns.b());
    
    // 初始渲染
    this.renderList();
    
    // 监听变化
    this.setupWatcher();
  }
  
  private renderList() {
    // 清理现有子节点
    this.clearChildren();
    
    const items = this.filteredItems.get();
    
    if (items.length === 0) {
      // 空列表提示
      const emptyItem = new TypeLi({
        children: ['No items found']
      });
      emptyItem.classList.add(ns.em('item', 'empty'));
      this.appendChild(emptyItem);
      return;
    }
    
    // 渲染列表项
    items.forEach((item, index) => {
      const li = new TypeLi({
        children: [item.label]
      });
      
      li.classList.add(ns.e('item'));
      li.classList.add(ns.em('item', `index-${index % 2}`)); // 斑马纹
      
      li.on('click', () => {
        this.props.onItemClick?.(item);
      });
      
      this.appendChild(li);
    });
  }
  
  private setupWatcher() {
    // 监听列表变化
    watch(this.filteredItems, () => {
      this.renderList();
    });
  }
  
  setFilter(text: string) {
    this.props.filterText = text;
  }
  
  getItems(): ListItem[] {
    return this.filteredItems.get();
  }
}
```

---

### 模板 4: Fragment 多根节点组件

```typescript
/**
 * @module TD.ui.Card
 * @extends TypeFragment
 * @description 卡片组件（多根节点）
 */

import { 
  TypeFragment,
  TypeDiv,
  TypeHeader,
  TypeFooter,
  TypeSection
} from '@type-dom/framework';
import { useNamespace } from '@type-dom/hooks';

/**
 * Card Props Interface
 */
interface CardProps {
  title?: string;
  subtitle?: string;
  footer?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

/**
 * Default Props
 */
const defaultProps: CardProps = {
  showHeader: true,
  showFooter: false
};

/**
 * Card Component
 */
export class TdCard extends TypeFragment<CardProps> {
  className = 'TdCard';
  public header!: TypeHeader;
  public body!: TypeSection;
  public footerEl!: TypeFooter;

  constructor(params = {}) {
    super(params);
    defaultProps(this);
  }

  setup() {
    const ns = useNamespace('card');
    
    // 创建头部
    if (this.props.showHeader) {
      this.header = new TypeHeader({
        children: [
          new TypeDiv({ 
            children: [this.props.title || ''],
            className: ns.e('title')
          })
        ]
      });
      
      if (this.props.subtitle) {
        const subtitle = new TypeDiv({ 
          children: [this.props.subtitle],
          className: ns.e('subtitle')
        });
        this.header.appendChild(subtitle);
      }
      
      this.header.classList.add(ns.e('header'));
      this.appendChild(this.header);
    }
    
    // 创建主体
    this.body = new TypeSection({
      className: ns.e('body')
    });
    this.appendChild(this.body);
    
    // 创建底部
    if (this.props.showFooter && this.props.footer) {
      this.footerEl = new TypeFooter({
        children: [this.props.footer],
        className: ns.e('footer')
      });
      this.appendChild(this.footerEl);
    }
  }
  
  setBodyContent(content: string | TypeNode) {
    this.body.clearChildren();
    this.body.appendChild(content);
  }
  
  setTitle(title: string) {
    if (this.header) {
      const titleEl = this.header.findChildNode('TypeDiv');
      if (titleEl) {
        (titleEl as any).textContent = title;
      }
    }
  }
}
```

---

### 模板 5: Teleport 模态框组件

```typescript
/**
 * @module TD.ui.Modal
 * @extends TypeDiv
 * @description 模态框组件（Teleport 到 body）
 */

import { 
  TypeDiv,
  Teleport,
  TypeFragment
} from '@type-dom/framework';
import { useNamespace, useFocusTrap, useClickOutside } from '@type-dom/hooks';
import { signal } from '@type-dom/signals';

/**
 * Modal Props Interface
 */
interface ModalProps {
  visible?: boolean;
  title?: string;
  closable?: boolean;
  maskClosable?: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

/**
 * Default Props
 */
const defaultProps: ModalProps = {
  visible: false,
  closable: true,
  maskClosable: true
};

/**
 * Modal Component
 */
export class TdModal extends TypeDiv<ModalProps> {
  className = 'TdModal';
  private teleport!: Teleport;
  private overlay!: TypeDiv;
  private modal!: TypeDiv;
  private isVisible = signal(false);

  constructor(params = {}) {
    super(params);
    defaultProps(this);
  }

  setup() {
    const ns = useNamespace('modal');
    
    // 初始化可见状态
    this.isVisible.set(this.props.visible!);
    
    // 创建 Teleport
    this.teleport = new Teleport({
      to: 'body',
      slot: this.renderContent.bind(this)
    });
    
    // 添加到 DOM
    this.appendChild(this.teleport);
    
    // 监听可见性
    watch(() => this.props.visible, (visible) => {
      this.isVisible.set(visible!);
    });
  }
  
  private renderContent() {
    const ns = useNamespace('modal');
    
    // 遮罩层
    this.overlay = new TypeDiv({
      className: ns.e('overlay')
    });
    
    // 模态框主体
    this.modal = new TypeDiv({
      className: ns.b()
    });
    
    // 头部
    const header = new TypeDiv({
      className: ns.e('header'),
      children: [
        new TypeDiv({ 
          className: ns.e('title'),
          children: [this.props.title]
        })
      ]
    });
    
    if (this.props.closable) {
      const closeBtn = new TypeDiv({
        className: ns.e('close'),
        children: ['×']
      });
      closeBtn.on('click', this.close.bind(this));
      header.appendChild(closeBtn);
    }
    
    // 内容区域
    const body = new TypeDiv({
      className: ns.e('body')
    });
    
    // 底部
    const footer = new TypeDiv({
      className: ns.e('footer'),
      children: [
        new TypeDiv({
          className: ns.em('button', 'cancel'),
          children: ['Cancel'],
          events: { click: this.close.bind(this) }
        }),
        new TypeDiv({
          className: ns.em('button', 'ok'),
          children: ['OK'],
          events: { click: this.confirm.bind(this) }
        })
      ]
    });
    
    // 组装
    this.modal.appendChild(header);
    this.modal.appendChild(body);
    this.modal.appendChild(footer);
    
    // 点击遮罩关闭
    if (this.props.maskClosable) {
      const { ref } = useClickOutside(() => {
        this.close();
      });
      
      onMounted(() => {
        ref.set(this.modal.dom);
      });
    }
    
    // 焦点陷阱
    const { activate, deactivate } = useFocusTrap();
    
    watch(this.isVisible, (visible) => {
      if (visible) {
        activate();
      } else {
        deactivate();
      }
    });
    
    return new TypeFragment({
      children: [this.overlay, this.modal]
    });
  }
  
  show() {
    this.isVisible.set(true);
    this.emit('update:visible', true);
  }
  
  close() {
    this.isVisible.set(false);
    this.emit('update:visible', false);
    this.emit('cancel');
    this.props.onCancel?.();
  }
  
  confirm() {
    this.close();
    this.emit('ok');
    this.props.onOk?.();
  }
  
  unmount() {
    // 清理 Teleport
    if (this.teleport) {
      this.teleport.unmount();
    }
    super.unmount();
  }
}
```

---

## 🔧 Hook 开发模板

### Hook 模板：useButton

```typescript
/**
 * Button Hook
 * 用于处理按钮的交互逻辑
 */

import type { ButtonProps } from '../components/Button';

export function useButton(
  props: ButtonProps,
  emit: (event: string, ...args: any[]) => void
) {
  /**
   * 处理点击事件
   */
  const handleClick = (event: MouseEvent) => {
    // 禁用和加载状态下不处理
    if (props.disabled || props.loading) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    
    // 发射事件
    emit('click', event);
    
    // 调用回调
    props.onClick?.(event);
  };
  
  /**
   * 获取按钮类型类名
   */
  const getTypeClass = (prefix: string): string => {
    return `${prefix}--${props.type || 'default'}`;
  };
  
  /**
   * 获取按钮尺寸类名
   */
  const getSizeClass = (prefix: string): string => {
    return `${prefix}--${props.size || 'medium'}`;
  };
  
  /**
   * 判断是否禁用
   */
  const isDisabled = (): boolean => {
    return !!props.disabled || !!props.loading;
  };
  
  return {
    handleClick,
    getTypeClass,
    getSizeClass,
    isDisabled
  };
}
```

---

## 💡 最佳实践

### 1. 遵循单一职责原则

```typescript
// ✅ 好：每个组件只做一件事
class TdButton extends TypeDiv { /* 只处理按钮逻辑 */ }
class TdInput extends TypeInput { /* 只处理输入框逻辑 */ }

// ❌ 坏：一个组件做太多事
class TdSuperComponent extends TypeDiv { 
  // 既有按钮逻辑，又有输入框逻辑，还有表单逻辑...
}
```

### 2. 使用组合而非继承

```typescript
// ✅ 好：组合
class TdFormButton extends TypeDiv {
  setup() {
    const button = new TdButton();
    const icon = new TdIcon();
    this.appendChild(button);
    this.appendChild(icon);
  }
}

// ❌ 坏：过度继承
class TdSpecialButton extends TdButton {
  // 修改了父类的核心行为
}
```

### 3. 合理使用响应式

```typescript
// ✅ 只对需要响应的数据使用 signal
class TdCounter extends TypeDiv {
  setup() {
    this.count = signal(0);  // ✅ 需要响应式
    this.uid = generateId(); // ✅ 不需要响应式
  }
}

// ❌ 滥用响应式
class TdComponent extends TypeDiv {
  setup() {
    everything = signal({});  // ❌ 所有东西都响应式
  }
}
```

### 4. 及时清理资源

```typescript
// ✅ 好：在 unmount 时清理
unmount() {
  if (this.timer) {
    clearInterval(this.timer);
  }
  if (this.subscription) {
    this.subscription.unsubscribe();
  }
  super.unmount();
}

// ❌ 坏：忘记清理导致内存泄漏
unmount() {
  super.unmount();
  // timer 和 subscription 没有清理
}
```

---

## 📚 相关文档

- [SIGNALS-API-GUIDE.md](./SIGNALS-API-GUIDE.md) - Signals API 完全指南
- [HOOKS-GUIDE.md](./HOOKS-GUIDE.md) - Hooks 完全指南
- [CODING-RULES.md](./CODING-RULES.md) - 编码规范
- [AI-CODE-CHECKLIST.md](./AI-CODE-CHECKLIST.md) - 代码检查清单

---

**最后更新**: 2026-03-13  
**维护者**: TypeDOM Team  
**许可**: MIT License
