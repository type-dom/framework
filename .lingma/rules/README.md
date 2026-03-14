# Framework Library Rules | Framework 库专属规则

## 📋 Overview | 概述

This directory contains library-specific rules for the `@type-dom/framework` library. These rules define core framework development patterns and best practices.

本目录包含 `@type-dom/framework` 库的专属规则。这些规则定义了核心框架的开发模式和最佳实践。

---

## 🎯 Rule Hierarchy | 规则层级

### Global Rules (Must Follow) | 全局规则（必须遵守）

The following global rules apply to this library:

- ✅ **GLOBAL-001** - Slot vs Content usage
- ✅ **GLOBAL-002** - Lifecycle hooks in setup()
- ✅ **GLOBAL-003** - AI docs organization

### Library-Specific Rules | 库专属规则

- 📄 **FWK-001** - TypeNode Base Class Implementation
- 📄 **FWK-002** - TypeElement DOM Integration
- 📄 **FWK-003** - Renderer Pattern Usage
- 📄 **FWK-004** - VNode Structure and Diffing
- 📄 **FWK-005** - Signals Reactivity System

---

## 📄 Rule FWK-001: TypeNode Base Class

**PRIORITY**: P0 - Critical (必须遵守)

### Context | 背景

TypeNode is the abstract base class for all TypeDOM nodes. Proper implementation ensures consistent behavior across the framework.

### ✅ CORRECT Pattern | 正确模式

```typescript
// type-node.abstract.ts
export abstract class TypeNode {
  // Basic node properties
  public id: string;
  public parent: TypeNode | null = null;
  public children: TypeNode[] = [];
  
  constructor() {
    this.id = this.generateId();
  }
  
  // Abstract methods must be implemented by subclasses
  public abstract render(): void;
  public abstract destroy(): void;
  
  // Common functionality
  public appendChild(child: TypeNode): void {
    child.parent = this;
    this.children.push(child);
  }
  
  public removeChild(child: TypeNode): void {
    const index = this.children.indexOf(child);
    if (index > -1) {
      this.children.splice(index, 1);
      child.parent = null;
    }
  }
  
  private generateId(): string {
    return `node_${Math.random().toString(36).substr(2, 9)}`;
  }
}

// Subclass implementation
export class TypeElement extends TypeNode {
  public tagName: string;
  
  constructor(tagName: string) {
    super();
    this.tagName = tagName;
  }
  
  override render(): void {
    // Render logic here
    console.log(`Rendering ${this.tagName}`);
  }
  
  override destroy(): void {
    // Cleanup logic
    this.children.forEach(child => child.destroy());
  }
}
```

### ❌ INCORRECT Pattern | 错误模式

```typescript
// ❌ Not implementing abstract methods
class MyNode extends TypeNode {
  // Missing render() and destroy() implementations
}

// ❌ Skipping super() call
class MyElement extends TypeNode {
  constructor() {
    // Missing super() - will cause error
    this.tagName = 'div';
  }
}

// ❌ Direct property manipulation instead of methods
node.children.push(child); // Should use appendChild()
node.parent = null; // Should use removeChild()
```

### Rationale | 理由

- Abstract base classes enforce consistent API
- Proper inheritance ensures lifecycle management
- Type safety catches errors at compile time

---

## 📄 Rule FWK-002: TypeElement DOM Integration

**PRIORITY**: P0 - Critical (必须遵守)

### Context | 背景

TypeElement bridges TypeNode with actual DOM elements. Proper integration ensures correct rendering and event handling.

### ✅ CORRECT Pattern | 正确模式

```typescript
// type-element.abstract.ts
export abstract class TypeElement extends TypeNode {
  protected domElement: HTMLElement | null = null;
  
  public mount(container: HTMLElement): void {
    if (!this.domElement) {
      this.domElement = document.createElement(this.getTagName());
      this.setupAttributes();
      this.setupEvents();
    }
    container.appendChild(this.domElement);
  }
  
  public unmount(): void {
    if (this.domElement && this.domElement.parentNode) {
      this.domElement.parentNode.removeChild(this.domElement);
      this.domElement = null;
    }
  }
  
  protected abstract getTagName(): string;
  protected setupAttributes(): void {
    // Override in subclass to set attributes
  }
  protected setupEvents(): void {
    // Override in subclass to add event listeners
  }
}

// Concrete implementation
export class DivElement extends TypeElement {
  protected getTagName(): string {
    return 'div';
  }
  
  protected setupAttributes(): void {
    if (this.domElement) {
      this.domElement.className = 'my-div';
      this.domElement.setAttribute('role', 'generic');
    }
  }
}
```

### ❌ INCORRECT Pattern | 错误模式

```typescript
// ❌ Creating DOM element in constructor
constructor() {
  super();
  this.domElement = document.createElement('div'); // Too early!
}

// ❌ Not cleaning up on unmount
unmount(): void {
  // Missing DOM removal logic
}

// ❌ Direct DOM manipulation without abstraction
element.innerHTML = '<span>Content</span>'; // Use proper methods
```

### Rationale | 理由

- Separation of concerns (logic vs rendering)
- Proper lifecycle management prevents memory leaks
- Abstraction enables server-side rendering

---

## 📄 Rule FWK-003: Renderer Pattern

**PRIORITY**: P1 - Important (重要)

### Context | 背景

The renderer pattern separates rendering logic from component logic, enabling multiple rendering strategies.

### ✅ CORRECT Pattern | 正确模式

```typescript
// renderer.ts
export class Renderer {
  public render(node: TypeNode, container: HTMLElement): void {
    if (node instanceof TypeElement) {
      this.renderElement(node, container);
    } else {
      this.renderNode(node, container);
    }
  }
  
  private renderElement(element: TypeElement, container: HTMLElement): void {
    element.mount(container);
    element.children.forEach(child => {
      this.render(child, container);
    });
  }
  
  private renderNode(node: TypeNode, container: HTMLElement): void {
    // Handle text nodes, comment nodes, etc.
    const textNode = document.createTextNode(node.toString());
    container.appendChild(textNode);
  }
}

// Usage
const renderer = new Renderer();
const div = new DivElement();
renderer.render(div, document.body);
```

### ❌ INCORRECT Pattern | 错误模式

```typescript
// ❌ Mixing rendering with business logic
class MyComponent {
  doSomething(): void {
    // Direct DOM manipulation
    document.body.innerHTML = '<div>Content</div>';
  }
}

// ❌ No abstraction for rendering
function renderEverything() {
  const el = document.createElement('div');
  el.innerHTML = '...';
  document.body.appendChild(el);
  // Hardcoded, not reusable
}
```

### Rationale | 理由

- Single responsibility principle
- Enables testing of rendering logic
- Supports multiple rendering backends

---

## 📄 Rule FWK-004: VNode Structure

**PRIORITY**: P1 - Important (重要)

### Context | 背景

Virtual DOM nodes enable efficient diffing and updates. Proper structure is crucial for performance.

### ✅ CORRECT Pattern | 正确模式

```typescript
// vnode.ts
export interface VNode {
  tag: string | Function;
  props: Record<string, any> | null;
  children: VNode[];
  text?: string;
  key?: string | number;
}

export function h(tag: string, props: any = {}, children: VNode[] = []): VNode {
  return {
    tag,
    props: props || null,
    children: Array.isArray(children) ? children : [children],
  };
}

// Diffing algorithm
export function patch(oldVNode: VNode, newVNode: VNode): void {
  if (oldVNode.tag !== newVNode.tag) {
    // Replace entire node
    return;
  }
  
  // Update props
  updateProps(oldVNode.props, newVNode.props);
  
  // Update children
  updateChildren(oldVNode.children, newVNode.children);
}
```

### ❌ INCORRECT Pattern | 错误模式

```typescript
// ❌ Inconsistent VNode structure
const node1 = { tag: 'div', children: [] };
const node2 = { tagName: 'div', childNodes: [] }; // Different keys!

// ❌ Missing key prop for lists
items.map(item => h('li', {}, item.text)); // No key for diffing

// ❌ Mutating VNodes directly
vnode.props.class = 'new-class'; // Should create new object
```

### Rationale | 理由

- Consistent structure enables efficient diffing
- Keys improve list reconciliation performance
- Immutability prevents subtle bugs

---

## 📄 Rule FWK-005: Signals Reactivity

**PRIORITY**: P0 - Critical (必须遵守)

### Context | 背景

Signals provide reactive state management. Proper usage ensures predictable updates.

### ✅ CORRECT Pattern | 正确模式

```typescript
import { signal, computed, effect } from '@type-dom/signals';

// Create signals
const count = signal(0);
const double = computed(() => count() * 2);

// React to changes
effect(() => {
  console.log(`Count: ${count()}, Double: ${double()}`);
});

// Update signal
count.set(count() + 1);

// In components
export class Counter {
  private count = signal(0);
  
  increment(): void {
    this.count.set(this.count() + 1);
  }
  
  render(): VNode {
    return h('div', {}, [
      h('span', {}, [`Count: ${this.count()}`]),
      h('button', { onClick: () => this.increment() }, ['+'])
    ]);
  }
}
```

### ❌ INCORRECT Pattern | 错误模式

```typescript
// ❌ Modifying signal value directly
const items = signal<Item[]>([]);
items().push(newItem); // Won't trigger reactivity!
items.set([...items(), newItem]); // Correct

// ❌ Creating signals in loops
for (let i = 0; i < 10; i++) {
  const s = signal(i); // Memory leak!
}

// ❌ Circular dependencies
const a = computed(() => b());
const b = computed(() => a()); // Infinite loop!
```

### Rationale | 理由

- Signals enable fine-grained reactivity
- Immutable updates ensure change detection
- Proper cleanup prevents memory leaks

---

## 🔧 Development Workflow | 开发流程

### Creating New Features | 新功能开发

1. **Design Phase**
   - Define TypeScript interfaces
   - Plan component hierarchy
   - Identify reactive state

2. **Implementation Phase**
   - Create TypeNode subclasses
   - Implement rendering logic
   - Add signals for reactivity

3. **Testing Phase**
   - Write unit tests for each class
   - Test edge cases and error handling
   - Verify performance with large trees

### Code Review Checklist | 代码审查清单

- [ ] Follows FWK-001 (TypeNode patterns)
- [ ] Proper DOM integration (FWK-002)
- [ ] Uses renderer abstraction (FWK-003)
- [ ] VNode structure is consistent (FWK-004)
- [ ] Signals used correctly (FWK-005)
- [ ] Type definitions are complete
- [ ] Error handling is comprehensive
- [ ] Documentation is clear

---

## 📚 Related Resources | 相关资源

### Global Rules | 全局规则
- [`12-global-slot-rule.md`](../../../.lingma/rules/12-global-slot-rule.md)
- [`13-global-lifecycle-hook-rule.md`](../../../.lingma/rules/13-global-lifecycle-hook-rule.md)
- [`14-global-ai-docs-organization-rule.md`](../../../.lingma/rules/14-global-ai-docs-organization-rule.md)

### Library Documentation | 库文档
- [Framework README](../README.md)
- [Architecture Guide](../STRUCTURE.md)
- [AI Optimization Guide](../ai/AI-OPTIMIZATION-GUIDE.md)

### External References | 外部参考
- [TypeDOM Specification](../../../docs/TYPEDOM-SPEC.md)
- [Signals Reactivity Paper](../../../docs/SIGNALS-PAPER.md)

---

## 📊 Compliance Tracking | 合规跟踪

| Rule ID | Priority | Status | Last Audit |
|---------|----------|--------|------------|
| FWK-001 | P0 | ⏳ Pending | - |
| FWK-002 | P0 | ⏳ Pending | - |
| FWK-003 | P1 | ⏳ Pending | - |
| FWK-004 | P1 | ⏳ Pending | - |
| FWK-005 | P0 | ⏳ Pending | - |

---

*Last Updated: 2026-03-12*  
*Maintained By: TypeDOM Core Team*  
*Applicable To: All @type-dom/framework source code*
