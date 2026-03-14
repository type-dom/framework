# TypeDOM Hooks - 完全指南

> 🔧 **TypeDOM 框架组合式 API 工具库**
> 📍 让 AI 了解所有可用的 Hooks 函数

---

## 📖 概述

Hooks 是 TypeDOM 框架提供的可复用逻辑单元，采用纯函数形式，用于封装组件间的通用逻辑。

### 核心特性

- ✅ **纯函数** - 无副作用，易于测试
- ✅ **可组合** - 多个 Hooks 可以组合使用
- ✅ **类型安全** - 完整的 TypeScript 类型支持
- ✅ **按需引入** - Tree-shaking 友好

### Hook 命名规范

- 所有 Hooks 以 `use` 开头
- 使用 PascalCase 命名，如 `useNamespace`
- 返回对象或数组，提供清晰的接口

---

## 🎯 基础 Hooks

### useNamespace(block: string): BEMHelper

生成 BEM 命名规范的 CSS 类名。

**返回值:**
```typescript
interface BEMHelper {
  b: () => string;           // block
  m: (mod: string) => string;  // modifier
  e: (elem: string) => string; // element
  em: (elem: string, mod: string) => string; // element + modifier
}
```

**示例:**
```typescript
import { TypeDiv } from '@type-dom/framework';
import { useNamespace } from '@type-dom/hooks';

export class TdButton extends TypeDiv {
  className: 'TdButton';
  
  setup() {
    const ns = useNamespace('button');
    
    this.classList.add(
      ns.b(),      // 'td-button'
      ns.m('primary'),  // 'td-button--primary'
      ns.e('icon'),     // 'td-button__icon'
      ns.em('icon', 'large')  // 'td-button__icon--large'
    );
  }
}
```

**使用场景:**
- ✅ 组件样式命名
- ✅ 确保 BEM 规范一致性
- ✅ 避免硬编码类名

---

### useId(): string

生成唯一的 ID 标识符。

**示例:**
```typescript
import { TypeInput } from '@type-dom/framework';
import { useId } from '@type-dom/hooks';

export class TdInput extends TypeInput {
  className: 'TdInput';
  
  setup() {
    const id = useId();
    
    this.setAttribute('id', id);
    console.log('Generated ID:', id);  // 如：'td-input-123'
  }
}
```

**使用场景:**
- ✅ 表单元素 ID 生成
- ✅ ARIA 属性关联
- ✅ 唯一标识符需求

---

### useModel<T>(propName: string): ModelRef<T>

创建双向绑定引用。

**返回值:**
```typescript
interface ModelRef<T> {
  model: Computed<T>;
  toggle: () => void;
}
```

**示例:**
```typescript
import { TypeComponent } from '@type-dom/framework';
import { useModel } from '@type-dom/hooks';

export class TdToggle extends TypeComponent {
  className: 'TdToggle';
  
  setup() {
    const { model, toggle } = useModel<boolean>('modelValue');
    
    effect(() => {
      console.log('Model value:', model.get());
    });
    
    this.on('click', toggle);
  }
}
```

**使用场景:**
- ✅ v-model 指令实现
- ✅ 父子组件双向绑定
- ✅ 状态切换逻辑

---

## 🎭 交互 Hooks

### useClickOutside(handler: () => void): ClickOutsideRef

监听元素外部点击事件。

**返回值:**
```typescript
interface ClickOutsideRef {
  ref: Signal<HTMLElement | null>;
}
```

**示例:**
```typescript
import { TypeDiv } from '@type-dom/framework';
import { useClickOutside } from '@type-dom/hooks';

export class TdDropdown extends TypeDiv {
  className: 'TdDropdown';
  
  setup() {
    const { ref } = useClickOutside(() => {
      console.log('Clicked outside dropdown');
      this.emit('close');
    });
    
    // 在 onMounted 中设置 ref
    onMounted(() => {
      ref.set(this.dom);
    });
  }
}
```

**使用场景:**
- ✅ Dropdown 关闭逻辑
- ✅ Modal/Dialog 外部点击关闭
- ✅ Popover 隐藏逻辑

---

### useKeyPress(key: string, handler: () => void): void

监听键盘按键事件。

**示例:**
```typescript
import { TypeInput } from '@type-dom/framework';
import { useKeyPress } from '@type-dom/hooks';

export class TdSearchInput extends TypeInput {
  className: 'TdSearchInput';
  
  setup() {
    useKeyPress('Enter', () => {
      console.log('Enter key pressed');
      this.emit('search');
    });
  }
}
```

**使用场景:**
- ✅ 快捷键支持
- ✅ 表单提交（Enter 键）
- ✅ 键盘导航

---

### useFocusTrap(options?: FocusTrapOptions): FocusTrapRef

管理焦点陷阱，限制焦点在指定范围内。

**Options:**
```typescript
interface FocusTrapOptions {
  initialFocus?: HTMLElement;
  escapeDeactivates?: boolean;
  allowOutsideClick?: boolean;
}
```

**示例:**
```typescript
import { TypeDialog } from '@type-dom/framework';
import { useFocusTrap } from '@type-dom/hooks';

export class TdModal extends TypeDialog {
  className: 'TdModal';
  
  setup() {
    const { activate, deactivate } = useFocusTrap({
      escapeDeactivates: true,
      allowOutsideClick: false
    });
    
    onMounted(() => {
      activate();
    });
    
    onBeforeUnmount(() => {
      deactivate();
    });
  }
}
```

**使用场景:**
- ✅ Modal/Dialog 焦点管理
- ✅ 无障碍访问支持
- ✅ 键盘导航限制

---

## 🌐 工具 Hooks

### useLocale(): LocaleRef

获取国际化相关功能。

**返回值:**
```typescript
interface LocaleRef {
  t: (key: string, params?: Record<string, any>) => string;
  locale: Signal<string>;
}
```

**示例:**
```typescript
import { TypeSpan } from '@type-dom/framework';
import { useLocale } from '@type-dom/hooks';

export class TdI18nText extends TypeSpan {
  className: 'TdI18nText';
  
  setup() {
    const { t, locale } = useLocale();
    
    this.textContent = t('common.hello', { name: 'TypeDOM' });
    
    // 监听语言变化
    watch(locale, (newLocale) => {
      console.log('Locale changed to:', newLocale);
      this.textContent = t('common.hello', { name: 'TypeDOM' });
    });
  }
}
```

**使用场景:**
- ✅ 多语言支持
- ✅ 动态语言切换
- ✅ 文本翻译

---

### useTheme(): ThemeRef

获取和管理主题。

**返回值:**
```typescript
interface ThemeRef {
  theme: Signal<'light' | 'dark'>;
  toggle: () => void;
}
```

**示例:**
```typescript
import { TypeDiv } from '@type-dom/framework';
import { useTheme } from '@type-dom/hooks';

export class TdThemeProvider extends TypeDiv {
  className: 'TdThemeProvider';
  
  setup() {
    const { theme, toggle } = useTheme();
    
    effect(() => {
      const currentTheme = theme.get();
      this.classList.toggle('dark-theme', currentTheme === 'dark');
      this.classList.toggle('light-theme', currentTheme === 'light');
    });
    
    // 提供切换方法给子组件
    this.provide('theme-toggle', toggle);
  }
}
```

**使用场景:**
- ✅ 明暗主题切换
- ✅ 主题持久化
- ✅ 主题继承

---

### useCssVars(vars: Record<string, any>): void

注入 CSS 变量到组件作用域。

**示例:**
```typescript
import { TypeDiv } from '@type-dom/framework';
import { useCssVars } from '@type-dom/hooks';

export class TdThemedButton extends TypeDiv {
  className: 'TdThemedButton';
  
  setup() {
    const primaryColor = signal('#007bff');
    
    useCssVars({
      '--td-primary-color': primaryColor,
      '--td-primary-hover': computed(() => lighten(primaryColor.get(), 10))
    });
  }
}
```

**使用场景:**
- ✅ 动态主题色
- ✅ CSS 变量绑定
- ✅ 运行时样式调整

---

## 📋 Form Hooks

### useField(name: string): FieldRef

管理表单字段状态和验证。

**返回值:**
```typescript
interface FieldRef<T = any> {
  value: Signal<T>;
  error: Signal<string | null>;
  validate: () => boolean;
  reset: () => void;
}
```

**示例:**
```typescript
import { TypeInput } from '@type-dom/framework';
import { useField } from '@type-dom/hooks';

export class TdFormField extends TypeInput {
  className: 'TdFormField';
  
  setup() {
    const { value, error, validate } = useField('username');
    
    // 双向绑定
    this.addEventListener('input', (e) => {
      value.set((e.target as HTMLInputElement).value);
      validate();
    });
    
    // 显示错误
    effect(() => {
      const errorMsg = error.get();
      if (errorMsg) {
        this.classList.add('has-error');
        console.error(errorMsg);
      } else {
        this.classList.remove('has-error');
      }
    });
  }
}
```

**使用场景:**
- ✅ 表单字段管理
- ✅ 实时验证
- ✅ 错误提示

---

### useForm(formName: string): FormRef

管理整个表单的状态。

**返回值:**
```typescript
interface FormRef {
  values: Signal<Record<string, any>>;
  errors: Signal<Record<string, string>>;
  validate: () => Promise<boolean>;
  submit: () => Promise<void>;
  reset: () => void;
}
```

**示例:**
```typescript
import { TypeForm } from '@type-dom/framework';
import { useForm } from '@type-dom/hooks';

export class TdForm extends TypeForm {
  className: 'TdForm';
  
  setup() {
    const { values, validate, submit } = useForm('userForm');
    
    this.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const isValid = await validate();
      if (isValid) {
        await submit();
      }
    });
  }
}
```

**使用场景:**
- ✅ 表单整体管理
- ✅ 批量验证
- ✅ 表单提交

---

## 🎨 UI Hooks

### useModelToggle(prop: string): ModelToggleRef

控制显示/隐藏的 Hook。

**返回值:**
```typescript
interface ModelToggleRef {
  model: Computed<boolean>;
  toggle: () => void;
  show: () => void;
  hide: () => void;
}
```

**示例:**
```typescript
import { TypeDiv } from '@type-dom/framework';
import { useModelToggle } from '@type-dom/hooks';

export class TdCollapse extends TypeDiv {
  className: 'TdCollapse';
  
  setup() {
    const { model, toggle } = useModelToggle('modelValue');
    
    effect(() => {
      if (model.get()) {
        this.style.display = 'block';
      } else {
        this.style.display = 'none';
      }
    });
    
    this.on('click', toggle);
  }
}
```

**使用场景:**
- ✅ Collapse 展开/收起
- ✅ Modal 显示/隐藏
- ✅ Dropdown 打开/关闭

---

### useResizeObserver(target: Signal<HTMLElement>, callback: ResizeCallback): void

监听元素尺寸变化。

**示例:**
```typescript
import { TypeDiv } from '@type-dom/framework';
import { useResizeObserver } from '@type-dom/hooks';

export class TdResizable extends TypeDiv {
  className: 'TdResizable';
  
  setup() {
    const size = signal({ width: 0, height: 0 });
    
    useResizeObserver(signal(this.dom), (entries) => {
      for (const entry of entries) {
        size.set({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        });
      }
    });
    
    effect(() => {
      console.log('Size:', size.get());
    });
  }
}
```

**使用场景:**
- ✅ 响应式布局
- ✅ 动态尺寸计算
- ✅ 图表自适应

---

### useIntersectionObserver(target: Signal<HTMLElement>, callback: IntersectionCallback): void

监听元素可见性。

**示例:**
```typescript
import { TypeImg } from '@type-dom/framework';
import { useIntersectionObserver } from '@type-dom/hooks';

export class TdLazyImage extends TypeImg {
  className: 'TdLazyImage';
  
  setup() {
    const isVisible = signal(false);
    
    useIntersectionObserver(signal(this.dom), (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          isVisible.set(true);
          this.setAttribute('src', this.getAttribute('data-src'));
        }
      }
    });
  }
}
```

**使用场景:**
- ✅ 懒加载图片
- ✅ 无限滚动
- ✅ 可见性统计

---

## 🔧 高级 Hooks

### useTemplateRef<T extends Element>(key: string): Readonly<Signal<T | null>>

获取模板引用。

**示例:**
```typescript
import { TypeDiv } from '@type-dom/framework';
import { useTemplateRef } from '@type-dom/hooks';

export class TdEditor extends TypeDiv {
  className: 'TdEditor';
  
  setup() {
    const inputRef = useTemplateRef<HTMLInputElement>('input');
    
    onMounted(() => {
      const input = inputRef.get();
      if (input) {
        input.focus();
      }
    });
  }
}
```

**使用场景:**
- ✅ 访问 DOM 元素
- ✅ 调用子组件方法
- ✅ 表单聚焦

---

### useAttrs(): Readonly<Signal<Record<string, any>>>

获取组件属性。

**示例:**
```typescript
import { TypeDiv } from '@type-dom/framework';
import { useAttrs } from '@type-dom/hooks';

export class TdWrapper extends TypeDiv {
  className: 'TdWrapper';
  
  setup() {
    const attrs = useAttrs();
    
    effect(() => {
      // 透传属性到子元素
      const allAttrs = attrs.get();
      Object.entries(allAttrs).forEach(([key, value]) => {
        if (key !== 'class' && key !== 'style') {
          this.setAttribute(key, String(value));
        }
      });
    });
  }
}
```

**使用场景:**
- ✅ 属性透传
- ✅ 高阶组件
- ✅ 包装器组件

---

### useSlots(): Slots

获取插槽内容。

**返回值:**
```typescript
interface Slots {
  default: () => TypeNode[];
  [name: string]: (props?: any) => TypeNode[];
}
```

**示例:**
```typescript
import { TypeDiv } from '@type-dom/framework';
import { useSlots } from '@type-dom/hooks';

export class TdCard extends TypeDiv {
  className: 'TdCard';
  
  setup() {
    const slots = useSlots();
    
    const header = slots.header?.();
    const content = slots.default?.();
    const footer = slots.footer?.();
    
    if (header) {
      header.forEach(node => this.appendChild(node));
    }
    
    if (content) {
      content.forEach(node => this.appendChild(node));
    }
    
    if (footer) {
      footer.forEach(node => this.appendChild(node));
    }
  }
}
```

**使用场景:**
- ✅ 具名插槽
- ✅ 作用域插槽
- ✅ 动态插槽

---

## 💡 最佳实践

### 1. Hook 组合使用

```typescript
export class TdModal extends TypeDiv {
  className: 'TdModal';
  
  setup() {
    // 组合多个 Hooks
    const ns = useNamespace('modal');
    const { theme } = useTheme();
    const { activate, deactivate } = useFocusTrap();
    const { ref } = useClickOutside(() => this.hide());
    
    effect(() => {
      this.classList.add(ns.b());
      this.classList.add(ns.m(theme.get()));
    });
    
    onMounted(() => {
      activate();
      ref.set(this.dom);
    });
    
    onBeforeUnmount(() => {
      deactivate();
    });
  }
}
```

### 2. 自定义 Hook

```typescript
// 创建自定义 Hook
export function useLoading(initialState = false) {
  const loading = signal(initialState);
  
  const wrapPromise = async <T>(promise: Promise<T>): Promise<T> => {
    loading.set(true);
    try {
      return await promise;
    } finally {
      loading.set(false);
    }
  };
  
  return {
    loading,
    wrapPromise
  };
}

// 使用
export class TdDataFetcher extends TypeDiv {
  setup() {
    const { loading, wrapPromise } = useLoading();
    
    const fetchData = async () => {
      const data = await wrapPromise(api.getData());
      // 处理数据
    };
    
    fetchData();
  }
}
```

### 3. 避免常见错误

```typescript
// ❌ 错误：在 setup 外部调用 Hook
const ns = useNamespace('button');  // 必须在 setup 内部

export class TdButton extends TypeDiv {
  // ❌ 错误
  ns = useNamespace('button');
  
  setup() {
    // ✅ 正确
    const ns = useNamespace('button');
  }
}

// ❌ 错误：条件调用 Hook
if (condition) {
  useSomething();  // 违反 Rules of Hooks
}

// ✅ 正确：始终调用
useSomething();
```

---

## 📚 相关文档

- [COMPONENT-TEMPLATE.md](./COMPONENT-TEMPLATE.md) - 组件开发模板
- [CODING-RULES.md](./CODING-RULES.md) - 编码规范
- [HOOKS-GUIDE.md](./HOOKS-GUIDE.md) - Hooks 完全指南

---

**最后更新**: 2026-03-13  
**维护者**: TypeDOM Team  
**许可**: MIT License
