import { AnyFn } from '@type-dom/utils';
// import { logInstantiation, logMethod, logProperty } from '@type-dom/decorators';
// import { logger } from '@type-dom/decorators';
import { isRef, MaybeRef, watch } from '../../../reactivity';
// import { IJsonData } from '../../../interface';
import type { Attributes } from '../../../dom/modules/attribute';
import { RawStyle } from '../../../dom/modules/style/style.interface';
import { AppConfig, AppContext } from '../../../dom/components/app/app.interface';
import { emptyAppContext } from '../../../dom/components/app/createAppContext';
import { nextTick } from '../../../core/scheduler';
import { renderAnchor } from '../../renderer/anchor';
import { unmount } from '../../renderer/unmount';
import {
  ElementNamespace,
  RawDom,
  RealDom,
  RendererElement,
  RendererNode
} from '../../renderer/renderer';
import { findDown } from '../../helpers/findDown';
import { initParams } from '../../helpers/initParams';
// import { transformSlot } from '../../transforms/transformSlot';
import { emit, EmitsOptions, ObjectEmitsOptions } from '../../componentEmits';
import { Data } from '../../component';
import { LifecycleHooks, NodeName } from '../../enums';
import { NormalizedPropsOptions } from '../../componentProps';
import { Slots } from '../../componentSlots';
import { IEvent } from '../../event-emitter/event-emitter.interface';
import { addEmits } from '../../event-emitter/event-emitter';
// import { TypeElement } from '../type-element/type-element.abstract';
import {
  TransitionElement,
  TransitionHooks,
} from '../type-transition/type-transition.interface';
import {
  IAttr,
  // IMethods,
  ISettings,
  ITypeNode,
  TypeProps,
} from './type-node.interface';

let uid = 0;
/**
 * 虚拟DOM，TypeNode 抽象节点类, 所有节点类的抽象类；
 * abstract syntax tree 抽象语法树 抽象节点类
 * 子类有:
 *    TypeElement
 *    TextNode
 */
// @logInstantiation
// @logger.abstract()  // 需要 package.json 配置 "import": "./dist/index.js", 否则报错。
export abstract class TypeNode<
  Props extends TypeProps = TypeProps,
  Attrs extends Attributes = Attributes> implements ITypeNode {
  /**
   * 在生成dom字符串时，可以转为 attributes 的一个元素 { name: 'className', value: string }
   * 在定义ClassName时，要把当前类写入到TypeMap中；
   */
  // @logProperty
  abstract className: string; // 最终实体类的名称，解析转换时需要创建对应的类； 必然有；
  // abstract style?: Style | undefined;
  // abstract attr?: Attribute | undefined;

  // @logProperty
  attrObj?: Attrs = {} as Attrs; // unmount时，要能够被删除
  styleObj?: RawStyle = {};
  // abstract nodeValue?: string | number | undefined;
  /**
   * 属性包含元素的所有子节点，包括：
   * 元素节点（Element nodes）,nodeType为1
   * Fragment节点(Fragment nodes)，nodeType为11
   * 文本节点（Text nodes）,nodeType为3
   * 注释节点（Comment nodes）,nodeType为8
   */
  abstract childNodes?: TypeNode[] | undefined;
  refs: Record<string, TypeNode> = {};
  config?: AppConfig; // Data
  createdIn?: 'setup';

  transition?: TransitionHooks<TransitionElement> | undefined;

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
   * 注： this is Fragment , 片段的结束标记，用于标识片段的结束位置。
   */
  anchor?: Comment | Text; // fragment anchor  评论节点；vIf占位符使用，
  /**
   * 片段的起始标记，用于标识片段的起始位置。
   *  todo <!--[--> <!--]--> 片段的起始和结束标记，用于标识片段的起始和结束位置。
   */
  anchorStart?: Comment | Text;

  /**
   * 挂载到指定的组件的DOM,可以直接指向 body
   * todo Teleport execute mount to outer dom, so need not to property.
   */
  to?: MaybeRef<string | RealDom>;

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
  targetStart?: Comment | Text; // teleport target start anchor
  /**
   * 作用：标记 Teleport 内容在目标容器中的结束插入点。
   * 场景：与 targetStart 配合使用，定义 Teleport 内容在目标容器中的边界。
   * 行为：
   * 在 首次渲染 时，Vue 会在目标容器中插入一个注释节点作为 targetAnchor。
   * 在 更新/卸载 时，通过 targetStart 和 targetAnchor 删除或替换整个 Teleport 内容块。
   */
  targetAnchor?: Comment | Text; // teleport target anchor
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

  key?: PropertyKey | null;
  /**
   * 存储 传入的参数。 只需要到处json时有就行。
   */
  // @logProperty
  // @logger.property()
  params: Props;
  /**
   * 属性项
   */
  // @logProperty
  // @logger.property()
  props: Props;
  attrs?: Data;
  slots?: Slots;

  // $options: Props; // & { [key: string]: unknown };
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

  parent?: TypeNode<any, any> | undefined;
  isContext?: boolean;
  items?: TypeProps[];
  // textNode?: TextNode;
  lifeCycles: Record<LifecycleHooks, AnyFn[]> = {} as Record<
    LifecycleHooks,
    AnyFn[]
  >;
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
  eventObservers: Record<string, Map<AnyFn | undefined, IEvent>> = {};
  eventListeners: Record<string, AnyFn | AnyFn[]> | null;

  // emitObservers: Record<string, Map<AnyFn | undefined, number>> = {};
  // abstract nodeName: NodeName.TEXT | NodeName.FRAGMENT | string;

  /**
   * used for caching the value returned from props default factory functions to
   * avoid unnecessary watcher trigger
   * @internal
   */
  propsDefaults?: Data;

  // lifecycle
  isRendered?: boolean;
  isMounted?: boolean;
  isUnmounted?: boolean;
  isDeactivated?: boolean;

  // 是否触发样式作用域 whether to apply CSS rules with scopeId
  scopedId?: string;

  // optimization only
  shapeFlag?: number; // = type === Fragment ? 0 : ShapeFlags.ELEMENT,
  patchFlag?: number;
  dynamicProps?: string[] | null;
  dynamicChildren?: TypeNode[] | null;

  // application root node only
  appContext?: AppContext

  /**
   * deprecated
   */
  initEvents?(): void;

  tag?: string;
  abstract dom: RendererNode;
  // (| HTMLElement
  //  | SVGElement
  //  | DocumentFragment
  //  | Text
  //  | Comment
  //  | null
  //  | undefined
  //  ) & { $node: TypeNode, [propName: string | symbol]: any };
  parentDom?: RendererElement | null;

  /**
   * 获取父级元素
   * 可以是 DocumentFragment | HTMLElement | SVGElement | ShadowRoot | Document | null | undefined
   * 返回节点的父节点（Node），可能包含多种类型的节点：
   * 元素节点（Element）
   * 文档节点（Document）
   * 文档片段节点（DocumentFragment）
   * 以及其他类型的节点
   * 类型为 Node | null
   * 对于所有节点类型都可用，因为这是Node接口的属性
   * 如果节点没有父节点（如文档根节点），返回null
   */
  // get parentNode(): RendererElement | null | undefined {
  //   // return this.anchor?.parentNode as RendererElement | null | undefined;
  //   return this.parent?.dom;
  // }

  /**
   * 只返回父元素节点（Element），如果父节点不是元素节点，则返回null
   * 类型为 Element | null
   * 仅当父节点是元素节点时才返回值
   * 如果父节点是文档节点、文档片段或其他非元素节点，返回null
   */
  get parentElement() {
    if (this.parent?.dom instanceof Element) {
      return this.parent.dom;
    } else {
      return null;
    }
  }
  /**
   * 获取根节点;
   * 在应用项目中才会用到，在框架中是用不到的。
   * 应用项目中，根节点要设置 isRoot 为 true，这样就能获取到根节点了
   * 问题： 无法获取应用项目主类的方法和属性；
   */
  get root(): TypeNode | undefined {
    if (this?.isRoot || !this.parent) {
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
      return this.props.nodeValue ?? '';
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

  /**
   * children 属性返回一个只包含元素节点的数组（类似HTMLCollection的行为）
   * 它会过滤掉文本节点、注释节点和其他非元素节点
   * 这个集合是动态计算的，每次访问都会基于当前的 childNodes 进行过滤
   * 例如：div.children 将返回该 div 元素的所有子标签（如 <p>, <span> 等），但不会包含文本或注释
   *
   * @returns TypeNode[] 只包含元素节点的数组
   */
  get children(): TypeNode[] {
    if (!this.childNodes) {
      return [];
    }

    // 过滤出元素节点：排除文本节点、注释节点和片段节点
    return this.childNodes.filter(child => {
      // 排除文本节点
      if (child.props?.nodeName === NodeName.TEXT) {
        return false;
      }
      // 排除注释节点
      if (child.props?.nodeName === NodeName.COMMENT) {
        return false;
      }
      // 排除片段节点（DocumentFragment）
      if (child.props?.nodeName === NodeName.FRAGMENT) {
        return false;
      }
      // 其他节点都认为是元素节点
      return true;
    });
  }

  // 向下获取真实的 element ; TypeHtml TypeSvg
  get downRealElement(): TypeNode | undefined {
    // if (this.dom.nodeName === NodeName.FRAGMENT) {
    for (const child of this.children) {
      if (child.dom.nodeName === NodeName.FRAGMENT) {
        return child.downRealElement;
      } else if (child.dom.nodeName !== NodeName.TEXT && child.dom.nodeName !== NodeName.COMMENT) {
        return child;
      } else {

      }
    }
    // } else if (this.dom.nodeName !== NodeName.TEXT && this.dom.nodeName !== NodeName.COMMENT) {
    //   return this;
    // }
    return undefined;
  }

  // 向上获取真实的 element ;
  //  todo type-element 中 elementParent 重复；
  get upRealElement(): TypeNode | undefined {
    if (this.parent?.dom.nodeName === NodeName.FRAGMENT) {
      return this.parent?.upRealElement;
    }
    return this.parent;
  }

  constructor(params: Props) {
    this.eventListeners = null;
    // this.eventObservers = {};
    // this.emitObservers = {};
    this.uid = uid++;
    this.params = Object.freeze({ ...params }) as Props;
    // this.params = params;
    this.props = {} as Props;
    this.beforeCreate(); // 挂载前，执行一些初始化操作。其实也就是操作 config本身。
    initParams(this, params);
  }
  /**
   *
   */
  // setup(props: Props, ctx?: SetupContext) {
  //   transformSlot(this, props.slot ?? props.slots?.default);
  // };

  /**
   * mount 才是组件对外的主方法
   * constructor 时，只是 this.props 赋值。
   * 子类 override props 时； props is undefined;
   * todo 要理顺与 render 方法的关系。 render 最终要私有化；
   * @param container
   * @param namespace
   */
  abstract mount(container: RendererNode, namespace?: boolean | ElementNamespace): TypeNode | void;

  /**
   * 渲染出真实DOM
   */
  abstract render(): void;

  isRoot?: boolean; // 是否是根节点 只有TypeRoot才为true
  attributes?: IAttr[] | undefined;
  settings?: ISettings;
  // _data?: IJsonData; // IObData;
  // methods?: IMethods;
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

  nextTick() {
    nextTick.bind(this)();
  }
  /**
   * 配置参数
   * 使用传入的参数，与节点结合
   * @param params
   */
  initParams(params: Props) {
    return initParams(this, params);
  }

  // 可重置config 的接口类型
  getProps(): Props {
    return this.props as Props;
  }

  getProp<T extends keyof Props>(key: T) {
    return this.props[key];
  }

  addProp(key: string, value: any) {
    Object.defineProperty(this.props, key, {
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

  setProp(key: keyof (Props & TypeProps), value?: any) {
    this.props[key] = value;
    if (value === undefined) {
      delete (this.props as Props)?.[key];
    }
  }

  // props.slots中添加slot的对象
  addPropSlot(name: string, slot: string | TypeNode | (string | TypeNode)[]) {
    if (!this.props.slots) {
      // console.error('styleObj is not initialized.');
      this.props.slots = {};
    }
    this.props.slots[name] = slot;
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

  setParent<P extends TypeNode<ParentProps, Attrs>, ParentProps extends TypeProps, Attrs extends Attributes>(
    parent: P
  ): void {
    this.parent = parent; // 单一原则
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

  up<T extends TypeNode>(className: string): T | undefined {
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
      for (const child of parent?.childNodes || []) {
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
    console.warn('clone . ');
    // const attrObj = deepClone(this.params.attrObj);
    // const styleObj = deepClone(this.params.styleObj);
    // 创建类的新实例
    return new (this.constructor as any)(this.params) as T;
  }
  addEmits(emits: EmitsOptions) {
    addEmits(this, emits);
  }
  emit = (event: string, ...args: any[]) => {
    emit(this, event, ...args);
  };

  /**
   * 生命周期
   * beforeCreate 渲染前
   * created 渲染前
   * render 渲染
   * afterRender 渲染后
   * mounted 挂载后
   */
  beforeCreate() {
    // console.error('beforeCreate . ');
    this.params.beforeCreate?.bind(this)();
    this.lifeCycles[LifecycleHooks.BEFORE_CREATE]?.forEach((fn) => fn());
  }

  /**
   * created函数用于在渲染TypeElement之前进行准备工作。
   * 该函数不接受参数，也不返回任何值。
   * 组件实例已经创建完成，数据观测和属性已初始化，但真实DOM尚未生成。
   * 主要完成以下工作：
   * 1. 打印日志说明当前处于created阶段。
   * 2. 检查dom属性是否已存在，若不存在，则创建一个新的DOM元素。
   * 3. 遍历当前Element的所有属性，对以':'和'@'开头的属性进行特殊处理。
   */
  created() {
    // 如果 TypeFragment字类没有设置 anchorStart/anchor 则在此赋值
    //  与 transforms 中的 vIf 中的 赋值配合
    //  与 Teleport 中的相关赋值配合
    renderAnchor(this);

    // todo appContext.app 在createApp创建的项目中，应该是 App而不是null
    // inherit parent app context - or - if root, adopt from root vnode
    const parent = this.parent;
    const appContext = parent?.appContext || this.appContext || emptyAppContext;
    // if (appContext.app === null) {
    //   console.error('created appContext.app is ', appContext.app);
    // }
    this.appContext = appContext;
    this.params.created?.bind(this)();
    // todo error ui-doc menus does not show
    // this.provides = parent?.provides ?? Object.create(appContext.provides);
    this.lifeCycles[LifecycleHooks.CREATED]?.forEach((fn) => fn());
  }

  /**
   * 在挂载开始之前调用，相关的render函数首次被调用，此时组件的$el属性还不存在。
   */
  beforeMount() {
    this.params.beforeCreate?.bind(this)();
    this.lifeCycles[LifecycleHooks.BEFORE_MOUNT]?.forEach((fn) => fn());
  }
  /**
   * 组件实例被挂载到DOM上，$el属性现在可以访问，但子组件可能还未挂载。
   * 该函数用于在挂载完成后执行一些额外的操作。
   * 如果需要在特定条件下执行渲染完成后的操作，可以实现此函数。
   * 在子类中覆写
   */
  mounted() {
    if (isRef(this.props?.tag)) {
      watch(this.props.tag, (newTag) => {
        // console.warn('tag change . newTag is ', newTag);
        const children = this.dom?.childNodes;
        let dom: HTMLElement | DocumentFragment | Text | Comment;
        if (newTag === 'fragment') {
          dom = document.createDocumentFragment();
          // children?.forEach(child => { // todo Fragment 和普通的标签不同；
          //   // dom?.appendChild(child);
          // })
        } else if (newTag === NodeName.TEXT) {
          dom = document.createTextNode(
            String(this.props.nodeValue ?? '')
          ); // todo content
        } else if (newTag === NodeName.COMMENT) {
          dom = document.createComment(String(this.props.nodeValue ?? ''))
        } else {
          dom = document.createElement(newTag || 'div'); // todo this.dom还要挂载到父级dom，而且是指定位置
          children?.forEach(child => { // todo
            dom.appendChild(child);
          })
        }
        this.dom?.parentElement?.replaceChild(dom, this.dom);
        this.dom = dom;
        if (this.props.refDom) {
          this.props.refDom.set(dom as HTMLElement);
        }
        this.props.nodeName = newTag;
        this.render();
      })
    }
    this.params.mounted?.bind(this)();
    this.lifeCycles[LifecycleHooks.MOUNTED]?.forEach((fn) => fn());
  }
  beforeUpdate() {
    this.params.beforeUpdate?.();
    this.lifeCycles[LifecycleHooks.BEFORE_UPDATE]?.forEach((fn) => fn());
  }
  updated() {
    this.params.updated?.bind(this)();
    this.lifeCycles[LifecycleHooks.UPDATED]?.forEach((fn) => fn());
  }
  beforeUnmount() {
    this.params.beforeUnmount?.bind(this)();
    this.lifeCycles[LifecycleHooks.BEFORE_UNMOUNT]?.forEach((fn) => fn());
  }
  unmounted() {
    this.params.unmounted?.bind(this)();
    this.lifeCycles[LifecycleHooks.UNMOUNTED]?.forEach((fn) => fn());
  }
  activated() {
    this.params.activated?.bind(this)();
    this.lifeCycles[LifecycleHooks.ACTIVATED]?.forEach((fn) => fn());
  }
  deactivated() {
    this.params.deactivated?.bind(this)();
    this.lifeCycles[LifecycleHooks.DEACTIVATED]?.forEach((fn) => fn());
  }
  errorCaptured() {
    this.lifeCycles[LifecycleHooks.ERROR_CAPTURED]?.forEach((fn) => fn());
  }
  renderTracked() {
    this.lifeCycles[LifecycleHooks.RENDER_TRACKED]?.forEach((fn) => fn());
  }
  renderTriggered() {
    this.lifeCycles[LifecycleHooks.RENDER_TRIGGERED]?.forEach((fn) => fn());
  }
  serverPrefetch() {
    this.lifeCycles[LifecycleHooks.SERVER_PREFETCH]?.forEach((fn) => fn());
  }

  /**
   * 原 destroy
   * 销毁对象
   * 从父级中删除
   * 类似 render ，要迭代删除子节点；
   * 删除dom,
   * 要清理绑定的事件，  组件中绑定的事件时，有可能是 绑到 document,window的，必须清理，否则逻辑可能错误。
   */
  // @logMethod
  // @logger.method()
  unmount(root?: TypeNode): void {
    unmount(this, root);
  }
}
