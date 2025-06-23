import { AnyFn } from '@type-dom/utils';
import { MaybeRef } from '@type-dom/signals';
import { IJsonData } from '../../interface';
import { EventEmitter } from '../event-emitter/event-emitter.abstract';
import { TypeElement } from '../type-element/type-element.abstract';
import { Style } from '../style/style.class';
import { Attribute } from '../attribute/attribute.class';
import { InjectionKey } from '../apiInject';
import { LifecycleHooks, NodeName } from '../enums';
import { ElProp, TdDom } from '../type-element/type-element.interface';
import type {
  IAttr,
  IMethods,
  ISettings,
  ITypeNode,
  TypeProps,
} from './type-node.interface';
import { useUnmount } from './useUnmount';
import { useDump } from './useDump';
import { useDown } from './useDown';
import { useInject } from './useInject';
import { useAssignProps } from './useAssignProps';
import { useRemoveDom } from './useRemoveDom';

let uid = 0;
/**
 * 虚拟DOM，TypeNode 抽象节点类, 所有节点类的抽象类；
 * abstract syntax tree 抽象语法树 抽象节点类
 * 子类有:
 *    TypeElement
 *    TextNode
 */
export abstract class TypeNode extends EventEmitter implements ITypeNode {
  /**
   * 在生成dom字符串时，可以转为 attributes 的一个元素 { name: 'className', value: string }
   * 在定义ClassName时，要把当前类写入到TypeMap中；
   */
  abstract className: string; // 最终实体类的名称，解析转换时需要创建对应的类； 必然有；
  abstract style?: Style | undefined;
  abstract attr?: Attribute | undefined;
  // abstract nodeValue?: string | number | undefined;
  abstract childNodes?: TypeNode[] | undefined;
  abstract rendered: boolean;
  isBasic?: boolean;
  createdIn?: 'setup';
  comment?: Comment; // 评论节点；vIf占位符使用，
  key?: string;
  /**
   * 存储 传入的参数。 只需要到处json时有就行。
   */
  params: TypeProps;
  /**
   * 属性项
   */
  props: TypeProps;
  baseProps: TypeProps;

  parent?: TypeElement | undefined;
  /**
   * 挂载到指定的组件的DOM,可以直接指向 body
   * todo Teleport execute mount to outer dom, so need not to property.
   */
  to?: MaybeRef<string | TdDom>;
  isContext?: boolean;
  items?: TypeProps[];
  // textNode?: TextNode;
  lifeCycles: Record<LifecycleHooks, AnyFn[]>;
  //   {
  //   created?: AnyFn[];
  //   beforeMount?: AnyFn[];
  //   mounted?: AnyFn[];
  //   beforeUpdate?: AnyFn[];
  //   updated?: AnyFn[];
  //   beforeUnmount?: AnyFn[];
  //   unmounted?: AnyFn[];
  // };
  uid: number;
  isDeactivated: any;
  constructor() {
    super();
    this.uid = uid++;
    this.params = {}; // Object.freeze({}) as TypeProps;
    this.props = this.baseProps = {}; // Object.freeze({}) as TypeProps;
    this.lifeCycles = {} as Record<LifecycleHooks, AnyFn[]>;
    this.lifeCycles[LifecycleHooks.BEFORE_CREATE]?.forEach((fn) => fn());
    // onBeforeCreate(this);
    this.beforeCreate?.(); // 挂载前，执行一些初始化操作。其实也就是操作 config本身。
  }

  /**
   * mount 才是组件对外的主方法
   * constructor 时，只是 this.props 赋值。
   * todo 要理顺与 render 方法的关系。 render 最终要私有化；
   * @param el
   */
  abstract mount(el?: ElProp): void;

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
  provides?: Record<string | symbol, unknown>;
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
    if (this.props.nodeName === NodeName.FRAGMENT) {
      for (const child of this.children) {
        if (child.props.nodeName === NodeName.FRAGMENT) {
          return child.downRealElement;
        } else if (child.props.nodeName !== NodeName.TEXT) {
          return child;
        }
      }
    } else if (this.props.nodeName !== NodeName.TEXT) {
      return this;
    }
    return undefined;
  }

  // 向上获取真实的 element ;
  get upRealElement(): TypeNode | undefined {
    if (this.props.nodeName === NodeName.FRAGMENT) {
      return this.parent?.upRealElement;
    } else if (this.props.nodeName !== NodeName.TEXT) {
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

  setProp<T extends TypeProps>(key: keyof T, value?: any) {
    (this.props as T)[key] = value;
    if (value === undefined) {
      delete (this.props as T)?.[key];
    }
  }

  /**
   * 组装属性
   * 根据提供的配置参数构建属性
   * @param config
   */
  assignProps<T extends TypeProps>(config = {} as T): T {
    return useAssignProps(this, config);
  }

  // props.slots中添加slot的对象
  addPropSlot(name: string, slot: string | TypeNode | (string | TypeNode)[]) {
    if (!this.props?.slots) {
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

  // 提供
  provide = <T, K = InjectionKey<T> | string | number>(
    key: K,
    value: K extends InjectionKey<infer V> ? V : T
  ) => {
    this.provides = this.provides || {};
    this.provides[key as string] = value;
  };

  /**
   * 注入
   * 依赖 parent 递归注入
   * 要在 created 中调用，否则可能会parent没有初始化。
   * @param key
   * @param defaultValue
   */
  inject<T>(
    key: InjectionKey<T> | string,
    defaultValue?: T,
    treatDefaultAsFactory = false
  ): T | undefined {
    return useInject(this, key, defaultValue, treatDefaultAsFactory);
  }

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
    return useDown<T>(expr, value, this as unknown as T);
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
   * 拼接出DOM字符串对应的数组。
   * buffer.join(''), 获得对应的字符串。
   * @param buffer
   */
  dump(buffer: string[]): void {
    useDump(buffer, this);
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

  /**
   * 清除自有dom节点。对象自身还没有被删除。
   * 删除对象，要在父级中。
   * this.dom的值也没有变。
   */
  removeDom(): void {
    useRemoveDom(this);
  }

  // clear this.dom.childNodes
  clearChildDom() {
    if (this.dom) {
      while (this.dom.firstChild) {
        this.dom.removeChild(this.dom.firstChild);
      }
    }
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
   * 创建DOM元素
   *
   * 根据提供的标签名创建一个DOM元素，并将该元素赋值给实例的dom属性
   */
  // todo 与 transition 中对应的方法
  createDom(): void {
    if (!this.dom) {
      // console.warn('createDom this.dom has existed . ');
      const nodeName = this.props.tag || this.props.nodeName;
      if (nodeName === NodeName.FRAGMENT) {
        this.dom = document.createDocumentFragment();
      } else if (nodeName === NodeName.TEXT) {
        this.dom = document.createTextNode(
          this.props.nodeValue?.toString() || ''
        ); // todo content
      } else {
        this.dom = document.createElement(nodeName || 'div');
      }
    }
  }

  /**
   * 销毁对象
   * 从父级中删除
   * 类似 render ，要迭代删除子节点；
   * 删除dom,
   * 要清理绑定的事件，  组件中绑定的事件时，有可能是 绑到 document,window的，必须清理，否则逻辑可能错误。
   */
  unmount(root?: TypeElement): void {
    useUnmount(this, root);
  }
}
