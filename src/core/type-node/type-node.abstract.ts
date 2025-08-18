import { AnyFn } from '@type-dom/utils';
import { MaybeRef } from '../../reactivity';
import { IJsonData } from '../../interface';
import { Attributes } from '../../dom/modules/attribute';
import { RawStyle } from '../../dom/modules/style/style.interface';
import { TypeElement } from '../type-element/type-element.abstract';
import { TypeEl, RawDom } from '../type-element/type-element.interface';
import { unmount } from '../helpers/unmount';
import { findDown } from '../helpers/findDown';
import { ObjectEmitsOptions } from '../componentEmits';
import { Data } from '../component';
import { LifecycleHooks, NodeName } from '../enums';
import { NormalizedPropsOptions, } from '../componentProps';
import { IEvent } from '../event-emitter/event-emitter.interface';
import { emit } from '../event-emitter/event-emitter';
import {
  IAttr,
  IMethods,
  ISettings,
  ITypeNode,
  TypeProps
} from './type-node.interface';

let uid = 0;
/**
 * 虚拟DOM，TypeNode 抽象节点类, 所有节点类的抽象类；
 * abstract syntax tree 抽象语法树 抽象节点类
 * 子类有:
 *    TypeElement
 *    TextNode
 */
export abstract class TypeNode<A extends Attributes = Attributes> implements ITypeNode {
  /**
   * 在生成dom字符串时，可以转为 attributes 的一个元素 { name: 'className', value: string }
   * 在定义ClassName时，要把当前类写入到TypeMap中；
   */
  abstract className: string; // 最终实体类的名称，解析转换时需要创建对应的类； 必然有；
  // abstract style?: Style | undefined;
  // abstract attr?: Attribute | undefined;
  attrObj?: A = {} as A; // unmount时，要能够被删除
  styleObj?: RawStyle = {};
  // abstract nodeValue?: string | number | undefined;
  abstract childNodes?: TypeNode[] | undefined;
  abstract rendered: boolean;
  config?: any;
  isBasic?: boolean;
  createdIn?: 'setup';
  /**
   * anchor 是片段（Fragment）在真实 DOM 中的位置标记，用于标识该片段在 DOM 树中的插入点或边界点。
   * 它主要用于以下场景：
   * 片段插入与定位
   * 当一个组件或模板包含多个根节点时，Vue 会将这些节点包裹在一个 Fragment 类型的 VNode 中。
   * anchor 属性用于标记该片段在真实 DOM 中的插入位置。
   * 这有助于渲染器在更新时正确地将整个片段插入到指定的位置，而不会影响其他部分的 DOM 结构。
   * 动态内容更新
   * 在动态内容（如 v-for 或 v-if）中，anchor 用于标记片段的起始或结束位置。
   * 当内容发生变化时，渲染器可以根据 anchor 快速定位到需要更新的区域，从而高效地进行 DOM 操作。
   * 避免重复渲染
   * 在某些复杂的渲染场景中，anchor 可以作为参考点，帮助渲染器判断是否需要重新渲染整个片段，或者只需对片段内的部分内容进行更新。
   * 这有助于减少不必要的 DOM 操作，提升性能。
   * 与 target 和 targetAnchor 配合使用
   * 在 Teleport 组件中，anchor 通常与 target 和 targetAnchor 配合使用，用于标识当前片段在目标容器中的插入位置。
   * 这样可以确保被传送的内容被正确插入到目标 DOM 节点的合适位置。
   */
  anchor?: Comment; // fragment anchor  评论节点；vIf占位符使用，
  /**
   * 作用：指向 Teleport 组件要将内容渲染到的目标 DOM 容器。
   * 场景：当使用 <Teleport to="#app"> 时，target 会指向 document.getElementById('app')。
   * 生命周期：
   * 在 创建 VNode 时由 to 属性解析而来。
   * 在 挂载/更新 阶段用于定位目标容器。
   */
  target?: RawDom | null; // teleport target
  /**
   * 作用：标记 Teleport 内容在目标容器中的起始插入点。
   * 场景：当目标容器中已有多个 Teleport 内容时，用于标识当前 Teleport 内容的起始位置。
   * 行为：
   * 在 首次渲染 时，Vue 会在目标容器中插入一个注释节点作为 targetStart。
   * 在 更新/卸载 时，通过 targetStart 和 targetAnchor 定位并操作整个 Teleport 内容块。
   */
  targetStart?: RawDom | null; // teleport target start anchor
  /**
   * 作用：标记 Teleport 内容在目标容器中的结束插入点。
   * 场景：与 targetStart 配合使用，定义 Teleport 内容在目标容器中的边界。
   * 行为：
   * 在 首次渲染 时，Vue 会在目标容器中插入一个注释节点作为 targetAnchor。
   * 在 更新/卸载 时，通过 targetStart 和 targetAnchor 删除或替换整个 Teleport 内容块。
   */
  targetAnchor?: RawDom | null; // teleport target anchor
  /**
   * 三者协作流程
   * 创建阶段：
   * Vue 解析 <Teleport to="#app">，设置 target 为 #app。
   * 在目标容器中插入 targetStart 和 targetAnchor 注释节点作为占位符。
   * 将 Teleport 的子节点（如 <div>模态框</div>）插入到 targetStart 和 targetAnchor 之间。
   * 更新阶段：
   * 如果 Teleport 内容发生变化，Vue 会直接操作 targetStart 和 targetAnchor 之间的 DOM 节点，无需重新插入整个内容块。
   * 如果目标容器被动态修改（如切换 to 属性），会重新设置 target 并迁移内容。
   * 卸载阶段：
   * 通过 targetStart 和 targetAnchor 定位内容范围，删除整个 Teleport 内容及其占位符。
   */

  /**
   * 挂载到指定的组件的DOM,可以直接指向 body
   * todo Teleport execute mount to outer dom, so need not to property.
   */
  to?: MaybeRef<string | RawDom>;

  key?: string;
  /**
   * 存储 传入的参数。 只需要到处json时有就行。
   */
  params?: TypeProps;
  /**
   * 属性项
   */
  props: TypeProps;

  baseProps: TypeProps;
  /**
   * resolved props options
   * @internal
   */
  propsOptions: NormalizedPropsOptions = [];
  /**
   * resolved emits options
   * @internal
   */
  emitsOptions: ObjectEmitsOptions | null = null;
  /**
   * used for keeping track of .once event handlers on components
   * @internal
   */
  emitted: Record<string, boolean> | null = null;

  parent?: TypeElement | undefined;
  isContext?: boolean;
  items?: TypeProps[];
  // textNode?: TextNode;
  lifeCycles: Record<LifecycleHooks, AnyFn[]>;
  uid: number;
  /**
   * 存储事件名称与事件监听器数组的映射
   * key 事件名 value: callback[]  回调数组
   * 注：  Map是es6新特性，所以这里用它来代替数组可能会有兼容问题。
   *
   *  This is an Object containing Maps:
   *   { [event: string]: Map<listener: function, numTimesAdded: number> }
   *    We use a Map for O(1) insertion/deletion and because it can have functions as keys.
   *
   *    We keep track of numTimesAdded (the number of times it was added) because if you attach the same listener twice,
   *     we should actually call it twice for each emitted event.
   */
    // observers: Record<string, AnyFn[]>;
  eventObservers: Record<string, Map<AnyFn | undefined, IEvent>> = {};
  emitObservers: Record<string, Map<AnyFn | undefined, number>> = {};
  // abstract nodeName: NodeName.TEXT | NodeName.FRAGMENT | string;

  /**
   * used for caching the value returned from props default factory functions to
   * avoid unnecessary watcher trigger
   * @internal
   */
  propsDefaults?: Data

  // lifecycle
  isMounted?: boolean
  isUnmounted?: boolean
  isDeactivated?: boolean

  abstract dom?:
    | HTMLElement
    | SVGElement
    | DocumentFragment
    | Text
    | Comment
    | null
    | undefined;

  constructor() {
    // this.eventObservers = {};
    // this.emitObservers = {};
    this.uid = uid++;
    // this.params = {}; // Object.freeze({}) as TypeProps;
    this.props = this.baseProps = {};
    this.lifeCycles = {} as Record<LifecycleHooks, AnyFn[]>;
    this.lifeCycles[LifecycleHooks.BEFORE_CREATE]?.forEach((fn) => fn());
    this.beforeCreate?.(); // 挂载前，执行一些初始化操作。其实也就是操作 config本身。
  }

  /**
   * mount 才是组件对外的主方法
   * constructor 时，只是 this.props 赋值。
   * 子类 override props 时； props is undefined;
   * todo 要理顺与 render 方法的关系。 render 最终要私有化；
   * @param el
   */
  abstract mount(el?: TypeEl): void;

  /**
   * 渲染出真实DOM
   */
  abstract render(): void;

  // abstract attrObj?: ITypeAttribute | undefined; // 合并到 this.props中
  isRoot?: boolean; // 是否是根节点 只有TypeRoot才为true
  attributes?: IAttr[] | undefined;
  settings?: ISettings;
  _data?: IJsonData; // IObData;
  methods?: IMethods;
  /**
   * Object containing values this component provides for its descendants
   * @internal
   */
  provides?: Record<string | symbol, unknown>;
  /**
   * for tracking useId()
   * first element is the current boundary prefix
   * second number is the index of the useId call within that boundary
   * @internal
   */
  ids: [string, number, number] = ['', 0, 0];
  template?: string | undefined;
  /**
   * 获取根节点;
   * 在应用项目中才会用到，在框架中是用不到的。
   * 应用项目中，根节点要设置 isRoot 为 true，这样就能获取到根节点了
   * 问题： 无法获取应用项目主类的方法和属性；
   */
  get root(): TypeNode | undefined {
    if (this?.isRoot) {
      return this;
    } else {
      // 要保证parent不为null，否则会报错。要保证应用项目中的parent都设置过了。
      return this.parent?.root;
    }
  }

  get index(): number {
    return this.parent ? this.parent.findChildIndex(this) : -1;
  }

  get firstChild(): TypeNode | undefined {
    return this.childNodes && this.childNodes[0];
  }

  get lastChild(): TypeNode | undefined {
    return this.childNodes && this.childNodes[this.childNodes.length - 1];
  }

  get nextSibling(): TypeNode | undefined {
    const childNodes = this.parent?.childNodes;
    if (!childNodes) {
      return undefined;
    }
    const index = childNodes.indexOf(this);
    if (index === -1 || index >= childNodes.length - 1) {
      return undefined;
    }
    return childNodes[index + 1];
  }

  get textContent(): string | number | boolean {
    if (!this.childNodes) {
      return this.baseProps.nodeValue ?? '';
    }
    // 使用一个字符串变量迭代添加,而非递归来累积文本内容。
    let content = '';
    for (const child of this.childNodes) {
      content += child.textContent;
    }
    return content;
    // return this.childNodes
    //   .map(function(child) {
    //     return child.textContent;
    //   })
    //   .join('');
  }

  get length(): number {
    return this.children.length;
  }

  get children(): TypeNode[] {
    return this.childNodes || [];
  }

  get upProvides(): Record<string | symbol, any> | undefined {
    if (this.parent?.provides) {
      return this.parent.provides;
    } else {
      return this.parent?.upProvides;
    }
  }
  // 向下获取真实的 element ; TypeHtml TypeSvg
  get downRealElement(): TypeNode | undefined {
    if (this.baseProps.nodeName === NodeName.FRAGMENT) {
      for (const child of this.children) {
        if (child.baseProps.nodeName === NodeName.FRAGMENT) {
          return child.downRealElement;
        } else if (child.baseProps.nodeName !== NodeName.TEXT) {
          return child;
        }
      }
    } else if (this.baseProps.nodeName !== NodeName.TEXT) {
      return this;
    }
    return undefined;
  }

  // 向上获取真实的 element ;
  get upRealElement(): TypeNode | undefined {
    if (this.baseProps.nodeName === NodeName.FRAGMENT) {
      return this.parent?.upRealElement;
    } else if (this.baseProps.nodeName !== NodeName.TEXT) {
      return this;
    }
    return undefined;
  }

  /**
   * 配置设置项
   * @param params
   */
  abstract useParams<T extends TypeProps>(params?: T): T;

  // 可重置config 的接口类型
  getProps<T extends TypeProps>(): T {
    return this.props as T;
  }

  getProp<T extends keyof TypeProps>(key: T) {
    return this.baseProps[key];
  }

  addProp(key: string, value: any) {
    Object.defineProperty(this.baseProps, key, {
      configurable: true,
      enumerable: true,
      get() {
        return value;
      },
      set(newValue) {
        value = newValue;
      },
    });
  }

  setProp<T extends TypeProps>(key: keyof T, value?: any) {
    (this.baseProps as T)[key] = value;
    if (value === undefined) {
      delete (this.baseProps as T)?.[key];
    }
  }

  // props.slots中添加slot的对象
  addPropSlot(name: string, slot: string | TypeNode | (string | TypeNode)[]) {
    if (!this.baseProps?.slots) {
      // console.error('styleObj is not initialized.');
      this.baseProps.slots = {};
    }
    this.baseProps.slots[name] = slot;
  }

  setRoot(isRoot: boolean) {
    this.isRoot = isRoot;
  }

  getRoot<T extends TypeNode>(): T | undefined {
    if (this.isRoot) {
      return this as unknown as T;
    } else {
      // 要保证parent不为null，否则会获取不到。要保证应用项目中的parent都设置过了。
      return this.parent?.getRoot();
    }
  }

  setContext(isContext: boolean) {
    this.isContext = isContext;
  }

  getContext<T extends TypeNode>(): T | undefined {
    if (this.isContext) {
      return this as unknown as T;
    } else {
      // 要保证parent不为null，否则会获取不到。要保证应用项目中的parent都设置过了。
      return this.parent?.getContext();
    }
  }

  // 在定义className时，要把当前类写入到TypeMap中；
  //   todo 创建类实例时都要运行一遍。
  // setClassName(className: string, TypeClass: any) {
  //   this.className = className;
  //   const isExisted = TypeNode.typeMap.hasOwnProperty(className);
  //   if (!isExisted) {
  //     TypeNode.typeMap[className] = TypeClass;
  //   } else {
  //     if (TypeNode.typeMap[className] === TypeClass) {
  //       console.log('this.className has been existed . ');
  //     } else {
  //       throw Error('this.className has been defined . ');
  //     }
  //   }
  //   console.log('TypeNode.typeMap is ', TypeNode.typeMap);
  // }

  setParent(parent: TypeElement): void {
    this.parent = parent; // 单一原则
  }

  appendParent(parent: TypeElement): void {
    this.parent = parent;
    parent.addChild(this);
  }

  hasChildNodes(): boolean {
    return this.childNodes ? this.childNodes.length > 0 : false;
  }

  /**
   * 找到下级指定 键名/键值 的第一个节点
   * 会递归遍历子节点
   * @param expr 字符串类型，表示用于评估的表达式，可以是嵌套属性的路径（用点分隔）
   *            如： className    index   router.path
   * @param value 如：TdIcon        1       /home
   */
  down<T extends TypeNode>(expr: string, value: any): T | undefined {
    return findDown<T>(expr, value, this as unknown as T);
  }

  up<T extends TypeElement>(className: string): T | undefined {
    if (this.parent?.className === className) {
      return this.parent as T;
    } else {
      return this.parent?.up(className);
    }
  }

  /**
   * 查找节点的父节点
   * 当parent不存在时，通过root 迭代查找
   * @param parent
   * @param node
   */
  findParent(
    parent: TypeNode | undefined,
    node: TypeNode
  ): TypeNode | undefined {
    if (node.parent) {
      return node.parent;
    } else {
      for (const child of (parent?.childNodes || [])) {
        if (child === node) {
          return parent;
        } else {
          return this.findParent(child, node);
        }
      }
      return undefined;
      // return parent?.childNodes?.find((child) => {
      //   if (child === node) {
      //     return parent;
      //   } else {
      //     return this.findParent(child, node);
      //   }
      // });
    }
  }

  /**
   * 查找子节点的index
   * 注：子节点有index属性，直接child.index。 可能子节点没有设置parent。
   * @param child
   */
  findChildIndex(child: TypeNode): number {
    if (!this.childNodes) {
      return -1;
    }
    return this.childNodes.findIndex((item) => item === child);
  }

  /**
   * 找到指定类名的全部后代节点
   * 会递归遍历子节点
   */
  findDownNodes(className: string): TypeNode[] {
    const nodes: TypeNode[] = [];
    for (const child of this.children) {
      if (child?.className === className) {
        nodes.push(child);
      } else if (child.children.length > 0) {
        nodes.push(...child.findDownNodes(className));
      }
    }
    return nodes;
  }

  /**
   * 查找指定类名的第一个子节点
   * @param className
   */
  findChildNode<T extends TypeNode>(className: string): T | undefined {
    for (const child of this.children) {
      if (child?.className === className) {
        return child as T;
      }
    }
    return undefined;
  }

  /**
   * 找到指定类名的所有子节点
   */
  findChildNodes<T extends TypeNode>(className: string): T[] {
    const nodes: T[] = [];
    for (const child of this.children) {
      if (child?.className === className) {
        nodes.push(child as T);
      }
    }
    return nodes;
  }

  /**
   * 保存json数据时使用。
   * 把当前数据层对象转换为 JSON 字面量。
   * 但是就数据层存储而言，是不需要转化page及其子元素的。
   * todo events如何处理？？
   */
  toJSON(): ITypeNode {
    return {
      className: this.className,
      // config: {
      //   attrObj: this.attr?.getObj(),
      //   styleObj: this.style?.getObj()
      // },
      props: this.props, // todo 可能有问题
      // nodeName: this.props.nodeName,
      // nodeValue: this.props.nodeValue,
      attributes: this.attributes,
      items: this.items,
      // transitionConfig: this.transitionConfig,
      childNodes: this.children.map((child) => {
        if (child.props.nodeName === NodeName.TEXT) {
          return {
            nodeValue: child.props.nodeValue, // textContent
          };
        } else {
          return child.toJSON();
        }
      }),
    } as ITypeNode;
  }

  // 会循环调用
  clone<T>(): T {
    // const attrObj = deepClone(this.params.attrObj);
    // const styleObj = deepClone(this.params.styleObj);
    // 创建类的新实例
    return new (this.constructor as any)(this.params) as T;
  }
  emit = (event: string, ...args: any[])=> {
    emit(this, event, ...args);
  }

  /**
   * 生命周期
   * beforeCreate 渲染前
   * created 渲染前
   * render 渲染
   * afterRender 渲染后
   * mounted 挂载后
   */
  beforeCreate?(): void;

  /**
   * 原 destroy
   * 销毁对象
   * 从父级中删除
   * 类似 render ，要迭代删除子节点；
   * 删除dom,
   * 要清理绑定的事件，  组件中绑定的事件时，有可能是 绑到 document,window的，必须清理，否则逻辑可能错误。
   */
  unmount(root?: TypeElement): void {
    unmount(this, root);
  }
}
