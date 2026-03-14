# TypeDOM 命名规范速查表

> 🏷️ **快速验证命名是否正确**
> 📍 确保代码一致性

---

## 📋 命名规范总览

| 类型 | 格式 | 示例 | 说明 |
|------|------|------|------|
| **组件类名** | `Td{ComponentName}` | `TdButton`, `TdInput` | PascalCase，加 Td 前缀 |
| **Props Interface** | `{ComponentName}Props` | `ButtonProps`, `InputProps` | PascalCase |
| **Hook 函数** | `use{Functionality}` | `useNamespace`, `useButton` | camelCase |
| **CSS 类名 (BEM)** | `{ns}-b / {ns}-m-{mod} / {ns}-e-{elem}` | `td-button`, `td-button--primary` | kebab-case |
| **文件名** | PascalCase | `Button.ts`, `TdButton.ts` | 与组件名一致 |
| **文件夹** | kebab-case | `basic/`, `form/`, `data/` | 小写短横线 |
| **命名空间** | `@type-dom/{lib}` | `@type-dom/framework` | 包名格式 |

---

## 🎯 组件命名规范

### 组件类名

```typescript
// ✅ 正确
export class TdButton extends TypeDiv { }
export class TdInput extends TypeInput { }
export class TdModal extends TypeDialog { }
export class TdDataTable extends TypeTable { }

// ❌ 错误
export class Button extends TypeDiv { }           // 缺少 Td 前缀
export class tdButton extends TypeDiv { }         // 应该 PascalCase
export class TD_BUTTON extends TypeDiv { }        // 不是常量
```

### Props Interface

```typescript
// ✅ 正确
interface ButtonProps {
  type?: string;
  disabled?: boolean;
}

interface InputProps {
  value?: string;
  placeholder?: string;
}

// ❌ 错误
interface buttonProps { }              // 应该 PascalCase
interface IButtonProps { }             // 不需要 I 前缀
interface Button_Props { }             // 不使用下划线
```

---

## 🔧 Hook 命名规范

### Hook 函数名

```typescript
// ✅ 正确
export function useNamespace(block: string) { }
export function useButton(props: any, emit: any) { }
export function useModelToggle(prop: string) { }
export function useClickOutside(handler: () => void) { }

// ❌ 错误
export function Namespace() { }        // 缺少 use 前缀
export function USE_NAMESPACE() { }    // 不是常量
export function namespaceUtil() { }    // 没有 use 前缀
```

### Hook 返回值

```typescript
// ✅ 正确：返回对象或数组
const { b, m, e } = useNamespace('button');
const [value, setValue] = useField('name');

// ❌ 错误：返回原始值
const ns = useNamespace('button');     // 应该返回对象
```

---

## 🎨 CSS 类名规范 (BEM)

### BEM 命名规则

```
Block:          td-button                    // 块
Modifier:       td-button--primary           // 修饰符
Element:        td-button__icon              // 元素
Element+Mod:    td-button__icon--large       // 元素 + 修饰符
```

### useNamespace 使用

```typescript
const ns = useNamespace('button');

// ✅ 正确
ns.b()           // 'td-button'                (block)
ns.m('primary')  // 'td-button--primary'       (modifier)
ns.e('icon')     // 'td-button__icon'          (element)
ns.em('icon', 'large')  // 'td-button__icon--large' (element + modifier)

// ❌ 错误
'td-button-primary'      // 手动拼接，不使用 BEM
'button'                 // 缺少命名空间
'TdButton'               // 应该 kebab-case
```

### 完整示例

```typescript
const ns = useNamespace('modal');

// 生成的类名
this.classList.add(
  ns.b(),              // 'td-modal'
  ns.m('fullscreen'),  // 'td-modal--fullscreen'
  ns.e('header'),      // 'td-modal__header'
  ns.em('btn', 'lg')   // 'td-modal__btn--lg'
);
```

---

## 📁 文件命名规范

### 组件文件

```typescript
// ✅ 正确
Button.ts                  // 简单组件
TdButton.ts               // 明确组件
UserCard.ts               // 业务组件
DataTable.ts              // 复杂组件

// ❌ 错误
button.ts                 // 应该 PascalCase
button-component.ts       // 不使用 kebab-case
Btn.ts                    // 缩写不清晰
```

### Hook 文件

```typescript
// ✅ 正确
useNamespace.ts           // Hook 文件
useButton.ts              // 组件 Hook
useForm.ts                // 表单 Hook

// ❌ 错误
UseNamespace.ts           // 应该 camelCase
namespace-hook.ts         // 不使用 kebab-case
namespace.ts              // 没有 use 前缀
```

### 测试文件

```typescript
// ✅ 正确
Button.spec.ts            // 测试文件
Button.test.ts            // 测试文件
batch.spec.ts             // 功能测试

// ❌ 错误
ButtonTest.ts             // 不需要 Test 后缀
button_test.ts            // 不使用下划线
test-Button.ts            // test 前缀不必要
```

---

## 🗂️ 文件夹命名规范

### 组件分类目录

```
components/
├── basic/               # 基础组件
│   ├── Button/
│   ├── Input/
│   └── Icon/
├── form/                # 表单组件
│   ├── Form/
│   ├── Select/
│   └── Checkbox/
├── data/                # 数据组件
│   ├── Table/
│   ├── Tree/
│   └── List/
├── feedback/            # 反馈组件
│   ├── Modal/
│   ├── Message/
│   └── Notification/
└── navigation/          # 导航组件
    ├── Menu/
    ├── Tabs/
    └── Breadcrumb/
```

### 工具目录

```
hooks/
├── useNamespace.ts
├── useButton.ts
└── useForm.ts

utils/
├── domUtils.ts
├── arrayUtils.ts
└── stringUtils.ts
```

---

## 🌐 命名空间规范

### 导入路径

```typescript
// ✅ 正确
import { TypeDiv } from '@type-dom/framework';
import { TdButton } from '@type-dom/ui';
import { signal } from '@type-dom/signals';
import { useNamespace } from '@type-dom/hooks';

// ❌ 错误
import { TypeDiv } from 'framework';           // 缺少 @type-dom
import { TypeDiv } from '@type-dom/Framework'; // 大小写错误
import { TypeDiv } from 'libs/framework';      // 不使用相对路径
```

### 路径映射

```json
// tsconfig.base.json
{
  "compilerOptions": {
    "paths": {
      "@type-dom/framework": ["libs/framework/src/index.ts"],
      "@type-dom/ui": ["libs/ui/src/index.ts"],
      "@type-dom/signals": ["libs/signals/src/index.ts"],
      "@type-dom/hooks": ["libs/hooks/src/index.ts"]
    }
  }
}
```

---

## 💡 最佳实践

### 1. 保持一致性

```typescript
// ✅ 整个项目使用统一的命名风格
class TdButton extends TypeDiv { }
interface ButtonProps { }
function useButton() { }
const ns = useNamespace('button');

// ❌ 混用不同风格
class Button extends TypeDiv { }          // 缺少 Td
interface IButtonProps { }                // I 前缀
function buttonHook() { }                 // 没有 use
```

### 2. 使用语义化命名

```typescript
// ✅ 语义清晰
class TdUserAvatar extends TypeDiv { }
class TdProductCard extends TypeDiv { }
function useAuth() { }
function usePermission() { }

// ❌ 语义模糊
class TdComp1 extends TypeDiv { }
class TdItem extends TypeDiv { }
function useXxx() { }
```

### 3. 避免缩写

```typescript
// ✅ 完整拼写
class TdButton extends TypeDiv { }
class TdModal extends TypeDiv { }
function useConfiguration() { }

// ❌ 过度缩写
class TdBtn extends TypeDiv { }
class TdMsg extends TypeDiv { }
function useConfig() { }                // 可接受，但最好完整
```

### 4. 特殊场景处理

```typescript
// ARIA 相关属性 - 保持标准命名
interface ButtonProps {
  ariaLabel?: string;          // ✅ 标准 ARIA 属性
  role?: string;
  tabIndex?: number;
}

// HTML 原生属性 - 使用 camelCase
interface InputProps {
  maxLength?: number;          // ✅ camelCase
  autoComplete?: string;
  autoCapitalize?: string;
}
```

---

## 🔍 快速检查清单

在提交代码前，检查以下命名规范：

### 组件相关
- [ ] 组件类名是否以 `Td` 开头？
- [ ] 组件类名是否使用 PascalCase？
- [ ] Props Interface 是否为 `{ComponentName}Props` 格式？
- [ ] 文件名是否与组件名一致？

### Hook 相关
- [ ] Hook 函数是否以 `use` 开头？
- [ ] Hook 函数是否使用 camelCase？
- [ ] Hook 返回值是否为对象或数组？

### CSS 相关
- [ ] CSS 类名是否使用 kebab-case？
- [ ] 是否使用 BEM 命名规范？
- [ ] 是否有正确的命名空间前缀？

### 文件组织
- [ ] 文件夹是否使用 kebab-case？
- [ ] 测试文件是否以 `.spec.ts` 或 `.test.ts` 结尾？
- [ ] 导入路径是否使用 `@type-dom/*` 格式？

---

## 📚 相关文档

- [COMPONENT-TEMPLATE.md](./COMPONENT-TEMPLATE.md) - 组件开发模板
- [HOOKS-GUIDE.md](./HOOKS-GUIDE.md) - Hooks 完全指南
- [CODING-RULES.md](./CODING-RULES.md) - 编码规范

---

**最后更新**: 2026-03-13  
**维护者**: TypeDOM Team  
**许可**: MIT License
