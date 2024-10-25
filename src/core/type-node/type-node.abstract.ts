import { IStyle } from '@type-dom/css-type';
import { camelToDash, encodeToXmlString } from '@type-dom/utils';
import type { IJsonData } from '../../interface';
import { EventEmitter } from '../event-emitter/event-emitter.abstract';
import { TypeElement } from '../type-element/type-element.abstract';
import { Style } from '../style/style.class';
import { Attribute } from '../attribute/attribute.class';
import type { IAttr, IMethods, ISettings, ITypeConfig, ITypeNode } from './type-node.interface';

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
  abstract nodeValue?: string | number | undefined;
  abstract childNodes?: TypeNode[] | undefined;
  abstract rendered: boolean;
  /**
   * 存储 传入的参数。 只需要到处json时有就行。
   */
  params: ITypeConfig;
  /**
   * 属性项
   */
  props: ITypeConfig;
  parent?: TypeElement | undefined;
  /**
   * 挂载到指定的组件的DOM,可以直接指向 body
   */
  to?: HTMLElement;
  isContext?: boolean;
  items?: ITypeConfig[];

  // textNode?: TextNode;

  protected constructor() {
    super();
    this.params = {}; // Object.freeze({}) as ITypeConfig;
    this.props = {}; // Object.freeze({}) as ITypeConfig;
    this.beforeCreate?.(); // 挂载前，执行一些初始化操作。其实也就是操作 config本身。
  }

  /**
   * mount 才是组件对外的主方法
   * constructor 时，只是 this.props 赋值。
   * todo 要理顺与 render 方法的关系。 render 最终要私有化；
   * @param el
   */
  abstract mount(el?: string | HTMLElement | SVGElement | ShadowRoot): void;

  /**
   * 渲染出真实DOM
   */
  abstract render(): void;

  /**
   * 更新，更新属性，样式，事件等。
   */
  abstract update(): void;

  // abstract attrObj?: ITypeAttribute | undefined; // 合并到 this.props中
  isRoot?: boolean; // 是否是根节点 只有TypeRoot才为true
  attributes?: IAttr[] | undefined;
  settings?: ISettings;
  _data?: IJsonData; // IObData;
  methods?: IMethods;
  provides?: Record<string | symbol, any>;
  template?: string | undefined;
  // data$?: XObservable<IXProxyConfig>
  // data$?: Observer;
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
      return this.nodeValue ?? '';
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

  /**
   * 配置设置项
   * @param params
   */
  abstract useParams<T extends ITypeConfig>(params?: T): T;

  // 可重置config 的接口类型
  getProps<T extends ITypeConfig>(): T {
    return this.props as T;
  }

  getProp<T extends keyof ITypeConfig>(key: T) {
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
      }
    });
  }

  setProp<T extends ITypeConfig>(key: keyof T, value?: any) {
    (this.props as T)[key] = value;
    if (value === undefined) {
      delete (this.props as T)?.[key];
    }
  }

  /**
   * 使用指定的标签创建一个DOM元素
   *
   * @param {string} tag - 可选参数，定义要创建的DOM元素的标签名，默认为 div
   *
   * 此方法主要负责初始化一个DOM元素，通过接收一个标签名参数来创建对应类型的DOM元素
   * 它首先将标签名赋值给实例的nodeName属性，然后使用document.createElement()方法
   * 根据提供的标签名创建一个DOM元素，并将该元素赋值给实例的dom属性
   */
  useTag<T extends HTMLElement | SVGElement | Text | undefined>(tag: '#text' | 'fragment' | string = 'div') {
    this.nodeName = tag;
    if (this.nodeName === 'fragment') {
      this.dom = undefined as T;
    } else if (this.nodeValue === '#text') {
      this.dom = document.createTextNode(''); // todo content
    } else {
      this.dom = document.createElement(this.nodeName.trim()) as T;
    }
  }

  /**
   * 构建属性
   * @param config
   */
  buildProps<T extends ITypeConfig>(config = {} as T): T {
    if (!this.props) {
      console.error('this.props is undefined . ');
      this.props = {};
    }
    for (const key in config) {
      // styleObj, attrObj, events 要单独处理
      if (key === 'styleObj') {
        this.style?.addObj(config.styleObj);
      } else if (key === 'attrObj') {
        if (config.attrObj) {
          this.attr?.addObj(config.attrObj);
        }
      } else if (key === 'events') {
        this.addEvents?.(config.events);
      } else if (key === 'emits') {
        this.addEmits?.(config.emits);
      }

      (this.props as T)[key] = config[key];
    }
    return this.props as T;
  }

  // config.slots中添加slot的对象
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
  provide<T>(key: string | symbol, value: T) {
    this.provides = this.provides || {};
    this.provides[key] = value;
  }

  /**
   * 注入
   * 依赖 parent 递归注入
   * 要在 created 中调用，否则可能会parent没有初始化。
   * @param key
   * @param defaultValue
   */
  inject<T>(key: string | symbol, defaultValue?: T): T | undefined {
    if (this.provides && this.provides[key]) {
      return this.provides[key];
    } else if (defaultValue) {
      return defaultValue;
    } else {
      return this.parent?.inject<T>(key);
    }
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
    // console.log('down expr is ', expr, ' value is ', value);
    if (value === undefined) {
      return undefined;
    }
    const path = expr.split('.');
    for (const child of this.children) {
      let propValue = path.reduce((acc: any, curr: string) => {
        // 如果当前累积值为 null 或 undefined，则返回 undefined
        if (!acc) {
          return undefined;
        }
        // 返回下一层的对象或属性值
        return acc[curr];
      }, child);
      if (!propValue) {
        propValue = path.reduce((acc: any, curr: string) => {
          // 如果当前累积值为 null 或 undefined，则返回 undefined
          if (!acc) {
            return undefined;
          }
          // 返回下一层的对象或属性值
          return acc[curr];
        }, child.props);
      }
      if (propValue === value) {
        return child as T;
      } else if (child.children.length > 0) {
        const res = child.down(expr, value)
        if (res) { // 有值才返回，否则继续遍历
          return res as T;
        }
      }
    }
    return undefined;
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
  findParent(parent: TypeNode | undefined, node: TypeNode): TypeNode | undefined {
    if (node.parent) {
      return node.parent;
    } else {
      for (const child of parent?.childNodes || []) {
        if (child === node) {
          return parent;
        } else {
          return this.findParent(child, node)
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
    return this.childNodes?.findIndex((item) => item === child) || -1;
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
    // console.log('type-node dump . ');
    if (this.nodeName === '#text') {
      buffer.push(encodeToXmlString(this.nodeValue));
      return;
    }
    buffer.push(`<${this.nodeName}`);
    // 下面组装 属性 和 样式
    if (this.attr?.getObj()) {
      for (let key in this.attr?.getObj()) {
        // 下面几个属性不需要转
        if (
          key !== 'viewBox' &&
          key !== 'spreadMethod' &&
          key !== 'gradientUnits'
        ) {
          key = camelToDash(key);
        }
        // todo
        buffer.push(
          ` ${key}="${encodeToXmlString(String(this.attr?.get(key)))}"`
        );
      }
    }
    if (this.style?.getObj()) {
      let style = '';
      for (const key in this.style?.getObj()) {
        style += `${camelToDash(key)}: ${encodeToXmlString(
          String(this.style?.get(key as keyof IStyle))
        )};`;
      }
      if (style !== '') {
        buffer.push(` style="${style}"`);
      }
    }
    // todo this.attributes may be repeated with this.attr.obj
    if (this.attributes) {
      for (const attribute of this.attributes) {
        buffer.push(
          ` ${attribute.name}="${encodeToXmlString(
            attribute.value?.toString()
          )}"`
        );
      }
    }
    if (this.hasChildNodes()) {
      buffer.push('>');
      if (this.childNodes) {
        for (const child of this.childNodes) {
          child.dump(buffer);
        }
      }
      buffer.push(`</${this.nodeName}>`);
    } else if (this.nodeValue !== undefined) {
      buffer.push(
        `>${encodeToXmlString(this.nodeValue.toString())}</${this.nodeName}>`
      );
    } else {
      buffer.push('/>');
    }
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
      config: {
        attrObj: this.attr?.getObj(),
        styleObj: this.style?.getObj()
      },
      nodeName: this.nodeName,
      nodeValue: this.nodeValue,
      attributes: this.attributes,
      items: this.items,
      // transitionConfig: this.transitionConfig,
      childNodes: this.children.map((child) => {
        if (child.nodeName === '#text') {
          return {
            // className: 'TextNode',
            // nodeName: '#text',
            nodeValue: child.nodeValue // textContent
          };
        } else {
          return child.toJSON();
        }
      })
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
   * 生命周期
   * beforeCreate 渲染前
   * created 渲染前
   * render 渲染
   * afterRender 渲染后
   * mounted 挂载后
   */
  beforeCreate?(): void;

  /**
   * created函数用于在渲染TypeElement之前进行准备工作。
   * 该函数不接受参数，也不返回任何值。
   * 主要完成以下工作：
   * 1. 打印日志说明当前处于created阶段。
   * 2. 检查dom属性是否已存在，若不存在，则创建一个新的DOM元素。
   * 3. 遍历当前Element的所有属性，对以':'和'@'开头的属性进行特殊处理。
   */
  created?(): void;

  /**
   * 可选的函数，无参数，无返回值。
   */
  beforeMount?(): void;

  /**
   * 可选的函数，无参数，无返回值。
   * 该函数用于在挂载完成后执行一些额外的操作。
   * 如果需要在特定条件下执行渲染完成后的操作，可以实现此函数。
   * 在子类中覆写
   */
  mounted?(): void;

  beforeUpdate?(): void;

  updated?(): void;

  //   todo update 组件更新
  beforeDestroy?(): void;

  /**
   * 从父级中删除
   * 类似 render ，要迭代删除子节点；
   * 要清理绑定的事件，  组件绑定的事件有可能是 绑到 document,window的，必须清理，否则逻辑可能错误。
   */
  destroy(root?: TypeNode): void {
    if (this.beforeDestroy) {
      this.beforeDestroy?.();
    }
    if (this.dom) {
      // 删除DOM
      this.dom.remove();
      this.dom = undefined;
    }
    this.childNodes?.forEach(child => child.destroy());
    this.childNodes = undefined;
    delete this.style;
    delete this.attr;
    // delete this.props;
    Reflect.deleteProperty(this, 'props');
    if (this.parent) {
      this.parent.childNodes.splice(this.index, 1);
    } else {
      console.error('this.parent is null . ');
      // 没有 parent 要root 遍历删除；
      // todo  如果项目没有设置root，则无法删除了。或者有多个root时，可能查找有问题；
      //      this.parent 都没有了，还如何获取 this.root ?
      const parent = this.findParent(root, this);
      parent?.childNodes && parent.childNodes.splice(this.index, 1);
    }
    this.destroyed?.();
  }

  destroyed?(): void;

}
