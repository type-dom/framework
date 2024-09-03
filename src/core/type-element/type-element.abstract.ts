import { fromEvent, Subscription } from 'rxjs';
import { camelToDash } from '@type-dom/utils';
import { IStyle } from '@type-dom/css-type';

import { IJsonDataProp, IObData } from '../../interface';
import { RouterView } from '../../router/router-view/router-view.class';
import { XProxy } from '../../observer/x-proxy/x-proxy.class';
import { Observer } from '../../observer/observer';
import { reactive } from '../../reactivity';
import { UnwrapNestedRefs } from '../../reactivity/reactive';
import { IEvent, IEvents } from '../../events/events.interface';
import { Parser } from '../../parser';
import type { ITypeConfig } from '../type-node/type-node.interface';
import { TypeNode } from '../type-node/type-node.abstract';
import { TextNode } from '../text-node/text-node.class';
import type {
  IBoundBox,
  ITypeElement,
} from './type-element.interface';
import { TypeElementController } from './type-element.controller';
export const vHash = Math.round(Math.random() * 1000000);

/**
 * 虚拟元素Element的数据结构
 * 可以对应到虚拟dom树。 createDom(tag, attr, children)
 * 与对应的导出时的数据结构是不一样的。
 * 除了 TextNode 之外的其它类型的 Node 。
 * todo 是否需要把相关的操作也添加进来。
 */
export abstract class TypeElement extends TypeNode implements ITypeElement {
  abstract override dom?: HTMLElement | SVGElement | undefined; // 不会是Text；
  // 包括 fragment
  abstract override nodeName: 'fragment' | string; // 必然有；
  nodeValue?: undefined;
  childNodes: TypeNode[];
  routerView?: RouterView;
  textNode?: TextNode;
  data?: UnwrapNestedRefs<IObData>; // ITypeNode 中设置了
  override subscriptions: Subscription[];
  modelValue?: IJsonDataProp;
  rendered: boolean;
  // private slotNodes?: ISlotNodes;
  ctrl: TypeElementController;
  protected constructor() {
    super();
    this.ctrl = new TypeElementController(this);
    // this.props.attrObj = {
    //   ['data-v-' + vHash]: true,
    // };
    this.attributes = [];
    this.childNodes = [];
    this.subscriptions = [];
    this.rendered = false;
  }

  get elementParent(): TypeElement | undefined {
    if (this.nodeName === 'fragment') {
      return this.parent?.elementParent;
    } else {
      return this;
    }
  }

  get id(): string {
    return this.getProps().attrObj?.id as string;
  }

  // get clientHeight(): string {
  //   if (this.dom) {
  //     return (this.dom.clientHeight / Ratio.mm2px).toFixed(2) + "mm"; // px ---> mm
  //   } else {
  //     return '0px';
  //   }
  // }

  /**
   * 获取dom的高度，带单位的。
   * 包括margin的高度。
   * margin 的单位 px ---> 单位换算
   */
  // get elementHeight(): string {
  //   const style = getComputedStyle(this.dom);
  //   const marginTop = parseFloat(style.marginTop);
  //   const marginBottom = parseFloat(style.marginBottom);
  //   const itemHeight = this.dom.offsetHeight + marginTop + marginBottom;
  //   return (itemHeight / mm2pxRatio).toFixed(2) + "mm"; // px ---> mm
  // }

  // get value(): string | undefined {
  //   return this.props.attrObj.value ? this.props.attrObj.value as string : undefined;
  // }
  // set value(str: string | undefined) {
  //   if (str !== undefined) {
  //     this.ctrl.setAttrObj({
  //       value: str,
  //     });
  //   } else {
  //     this.ctrl.removeAttribute('value');
  //   }
  // }

  get isShow() {
    return 'none' !== this.dom?.style?.display;
  }

  get boundBox(): IBoundBox {
    if (this.dom === undefined) {
      return {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
      };
    }
    const { left, top, width, height } = this.dom.getBoundingClientRect();
    // console.log('left is ', left, 'top is ', top, 'width is ', width, 'height is ', height);
    return {
      left: left + 'px',
      top: top + 'px',
      width: width + 'px',
      height: height + 'px',
    };
  }

  /**
   * 配置设置项
   * @param params
   */
  setParams<T extends ITypeConfig>(params = {} as T): T {
    this.params = params;
    if (params?.emits) {
      this.addEmits(params.emits);
    }
    if (params?.ref !== undefined) {
      params.ref.value = this;
    }
    if (params?.name) {
      this.ctrl.addAttrName(params.name);
    }
    // text: boolean 是td-button组件是否是text类型的属性
    if (params?.text !== undefined && typeof params.text !== 'boolean') {
      // 添加文本
      // 先判断子元素是否有TextNode，有的话就不再添加
      // 要this.textNode 而不是其它的 TextNode;
      if (this.textNode) {
        this.textNode.setText(params.text);
        if (this.findChildIndex(this.textNode) === -1) {
          this.addChild(this.textNode);
        }
      } else {
        this.textNode = new TextNode(params.text);
        this.addChild(this.textNode);
      }
      this.textNode.setParent(this);
    }
    if (params?.html) {
      const parser = new Parser();
      const xElement = parser.parseFromString(params.html);
      this.addChild(xElement);
    }
    if (params?.data) {
      // this.setDataObservable(params.data);
      this.data = reactive(params.data);
      // console.log('this.data$ is ', this.data$);
    }
    // todo 是否要单独处理。因为 parent 链是依赖addChild的。
    // 组件库中的组件 是没有 params.childNodes 的；
    if (params?.childNodes) {
      // 父元素为当前元素，子元素为params.childNodes
      params.childNodes.forEach((item) => {
        // item.parent = this; // addChild 会设置parent。
        this.addChild(item);
      });
      // this.childNodes = params.childNodes;
      // this.addChildren(...props.childNodes);
    }
    this.mergeConfig(params);
    return this.props as T;
  }

  isFragment() {
    return this.nodeName === 'fragment' && this.dom === undefined;
  }

  /**
   * 此函数用于向slot的元素添加或前置插入到子元素。通过参数`type`来决定是添加（默认）还是前置插入子元素。
   * `slot`参数可以是一个或多个子元素，根据`type`的不同，这些子元素会被添加到元素的末尾或前置到元素的开头。
   * @param slot 要添加或插入的子元素或子元素数组。
   * @param type 操作类型，可选值为`add`（默认）或`unshift`，分别代表添加和前置插入子元素。
   */
  slotChild(
    slot: string | TypeNode | (string | TypeNode)[],
    type: 'add' | 'unshift' = 'add'
  ) {
    if (type === 'unshift') {
      if (slot instanceof TypeNode) {
        this.unshiftChild(slot);
      } else if (typeof slot === 'string') {
        this.unshiftChild(new TextNode(slot));
      } else {
        slot.forEach((item) => {
          if (item instanceof TypeNode) {
            this.unshiftChild(item);
          } else if (typeof item === 'string') {
            this.unshiftChild(new TextNode(item));
          }
        });
      }
    } else {
      if (slot instanceof TypeNode) {
        this.addChild(slot);
      } else if (typeof slot === 'string') {
        this.addChild(new TextNode(slot));
      } else {
        slot.forEach((item) => {
          if (item instanceof TypeNode) {
            this.addChild(item);
          } else if (typeof item === 'string') {
            this.addChild(new TextNode(item));
          }
        });
      }
    }
  }

  /**
   * 在最后位置添加一个子节点，并渲染；
   * 如果newChild.parent存在，则可能需要执行newChild?.parent.removeChild(newChild)。需要根据业务逻辑判断。
   * 渲染到dom上
   * @param newChild
   */
  // abstract appendChild(newChild: TypeElement | TextNode): TypeElement | TextNode;
  appendChild(newChild: TypeNode): void {
    newChild.appendParent(this); // 如果不是子类，是其它地方的对象加过来，要重设其父类。
    this.renderChild(newChild); // todo this.render() 现在这样可能不渲染；因为自身DOM可能没有创建；
    // this.dom.appendChild(newChild.render().dom);
  }

  appendChildren(...newChildren: Array<TypeNode>) {
    for (const child of newChildren) {
      this.appendChild(child);
    }
  }

  /**
   * 从前面添加子元素
   * @param newChild
   */
  unshiftChild(newChild: TypeNode): void {
    newChild.setParent(this); // 如果不是子类，是其它地方的对象加过来，要重设其父类。 一个对象挂载到不同的父类中，可能会造成混乱。
    this.childNodes.unshift(newChild);
  }

  unshiftChildren(...newChildren: TypeNode[]) {
    this.childNodes.unshift(...newChildren);
  }

  /**
   * 后面添加子元素
   * new 时，也就是创建时，可以不设置parent；但是addChild时，需要设置parent。
   * @param newChild
   */
  addChild(newChild: TypeNode): void {
    newChild.setParent(this); // 如果不是子类，是其它地方的对象加过来，要重设其父类。 一个对象挂载到不同的父类中，可能会造成混乱。
    this.childNodes.push(newChild);
  }

  /**
   * 新增子元素，并设定parent
   * @param newChildren
   */
  addChildren(...newChildren: TypeNode[]): void {
    newChildren.forEach((child) => this.addChild(child));
  }

  /**
   * 通常与appendChild同时使用，但也有可能，分离开来使用
   * dom子节点会被重新渲染一遍。
   * WebPage是单独处理的。
   * @param newChild
   */
  renderChild(newChild: TypeNode): void {
    newChild.render();
    if (newChild.dom) {
      this.dom?.appendChild(newChild.dom);
    }
  }

  /**
   * 在指定下标插入新的文本或节点。
   * @param child
   * @param index 要插入的目标位置
   */
  insertChild(child: TypeNode, index: number): void {
    console.log('insertChild . ');
    this.childNodes.splice(index, 0, child);
    child.setParent(this);
  }

  /**
   * 在子元素指定下标位置插入Dom节点
   * 不再与数据层操作直接绑定了。
   * 另外，页面中插入需要单独实现。
   * @param newChild
   * @param index 数组下标
   */
  insertChildDom(newChild: TypeElement | TextNode, index: number): void {
    // 判断newChild是否已经插入到数据层中。默认应该先插入数据层，再插入dom树。
    // if (!this.parent) {
    //   console.error('newChild has no parent . ');
    //   return
    // }
    // 如果下标位置已有dom节点。
    if (this.childNodes.length > index + 1) {
      if (newChild.dom !== undefined) {
        this.dom?.insertBefore(newChild.dom, this.dom.childNodes[index]);
      }
    } else {
      this.renderChild(newChild);
    }
  }

  // insertChildren(children: Array<TypeElement | WebText>, index: number) {
  //   this.childNodes.splice(index, 0, ...children);
  //   children.map(child => child.appendParent(this));
  //   return children;
  // }

  /**
   * 移除指定下标的子元素。
   * @param index 从0开始。
   * @param length
   */
  removeChildAtIndex(index: number, length = 1): void {
    this.removeChildDomAtIndex(index, length); // 先移除对应的DOM
    this.childNodes.splice(index, length);
  }

  /**
   * 移除指定下标的dom子节点。
   * WebPage的removeChildDom相对特殊，要单独处理。
   * 注： 要在removeChild前执行。
   * @param index
   * @param length 移除的个数
   */
  removeChildDomAtIndex(index: number, length = 1): void {
    for (let i = 0; i < length; i++) {
      if (this.childNodes[index + i].dom) {
        this.dom?.removeChild(this.childNodes[index + i].dom!);
        //   this.childNodes[index + i].dom?.remove();
      }
    }
  }

  /**
   * 清理子节点
   * 包括字节点和子节点的DOM
   */
  clearChildren(): void {
    this.clearChildrenDom();
    this.clearChildNodes();
  }

  /**
   * 清除dom所有子节点
   * render时使用
   */
  clearChildrenDom(): void {
    let first = this.dom?.firstElementChild;
    while (first) {
      first.remove();
      first = this.dom?.firstElementChild;
    }
  }

  // 清理子节点
  clearChildNodes(): void {
    this.childNodes = [];
  }

  resetChildren(slot: string | TypeNode | (string | TextNode)[] | undefined) {
    this.clearChildren();
    if (slot) {
      this.slotChild(slot);
    }
  }
  /**
   *  替换指定的子元素
   */
  replaceChild(newNode: TypeElement, oldNode: TypeElement): void {
    const index = this.childNodes.indexOf(oldNode);
    if (index > -1) {
      // 替换操作
      this.childNodes.splice(index, 1, newNode);
      newNode.dom &&
        oldNode.dom &&
        this.dom?.replaceChild(newNode.dom, oldNode.dom);
      oldNode.parent = undefined;
      newNode.parent = this;
      return;
    }
    throw Error('node to be replaced is not a child of the current node . ');
  }

  /**
   * 替换指定位置的子元素
   * @param newNode
   * @param index
   */
  replaceChildIndex(newNode: TypeElement, index: number): void {
    // 替换操作
    this.childNodes.splice(index, 1, newNode);
    newNode.parent = this;
  }

  /**
   * 清除自有dom节点。对象自身还没有被删除。
   * 删除对象，要在父级中。
   * this.dom的值也没有变。
   */
  removeDom(): void {
    if (this.dom) {
      // this.parent?.dom?.removeChild(this.dom);
      this.dom.remove();
    } else {
      console.error('this.dom has been removed . ');
    }
  }

  findChildAtIndex(index: number): TypeNode | null {
    return this.childNodes[index] ?? null;
  }

  setPropValue(key: keyof this, value: IJsonDataProp) {
    const propValue = this[key];
    if (propValue instanceof XProxy) {
      propValue.setValue(value);
      if (key === 'modelValue') {
        // debugger;
        console.log('propValue is ', propValue);
        (this as any)?.setModelValue(value);
      }
    }
  }

  setup?(params?: ITypeConfig): void;

  recurseSetup() {
    console.log('traverse . ');
    this.setup?.(this.params);
    this.childNodes.forEach((child) => {
      if (child instanceof TypeElement) {
        child.recurseSetup();
      }
    });
  }

  /**
   * 挂载到真实DOM；
   * 需要手动挂载组件时使用，一般是挂载到框架外的DOM元素时。
   * 框架内的对象直接addChild就可以了。
   * 子元素是伪元素时，dom是undefined，要递归向下挂载。
   * mount(el) 类似与 main() 是框架的入口。
   * @param el
   */
  mount<T extends TypeElement>(el?: string | HTMLElement | SVGElement | ShadowRoot): T {
    // console.warn('mount .');
    // this.clearChildren(); // 清理子节点，包括DOM  todo ??? 不能加。
    this.setup?.();
    this.created && this.created();
    // this.recurseSetup(); // 挂载时，递归执行setup
    if (!this.dom && this.nodeName) {
      if (this.nodeName === 'fragment') {
        this.dom = undefined;
      } else {
        this.dom = document.createElement(this.nodeName);
      }
    }
    let appEl: HTMLElement | SVGElement | ShadowRoot | null | undefined;
    if (
      el instanceof HTMLElement ||
      el instanceof SVGElement ||
      el instanceof ShadowRoot
    ) {
      appEl = el;
    } else if (typeof el === 'string') {
      appEl = document.querySelector<HTMLElement>(el);
    }
    // else {
    //   if (this.nodeName === 'fragment') {
    //     appEl = this.parent?.elementParent?.dom;
    //   } else {
    //     appEl = this.dom;
    //   }
    // }
    this.beforeMount && this.beforeMount();
    if (this.nodeName === 'fragment') {
      for (const child of this.children) {
        // todo child 是 Transition时，这里的逻辑有问题
        appEl = appEl || this.parent?.elementParent?.dom;
        if (this.to) {
          child.mount(this.to);
          console.log('this.to is ', this.to);
        } else if (appEl) {
          child.mount(appEl);
        } else {
          throw Error('Can not find el . ');
        }
      }
    } else {
      this.render(); // setStyleObj, setAttrObj
      if (appEl && this.dom) {
         appEl.appendChild(this.dom);
      }
      // 如CollapsibleBox中，contents重新赋值后，children会变，而childNodes是不变的。
      for (const child of this.children) {
        // this.renderChild(child);
        child.mount(this.dom);
      }
    }
    this.mounted && this.mounted();
    this.preEvents();
    // fragment 可以设置监听事件。但监听的dom对象不是fragment的dom。
    this.initEvents && this.initEvents();
    return this as unknown as T;
  }

  // todo
  update() {
    // console.warn('mount .');
    // this.clearChildren(); // 清理子节点，包括DOM  todo ??? 不能加。
    // this.recurseSetup(); // 挂载时，递归执行setup
    if (!this.dom && this.nodeName) {
      if (this.nodeName === 'fragment') {
        this.dom = undefined;
      } else {
        this.dom = document.createElement(this.nodeName);
      }
    }
    this.beforeUpdate && this.beforeUpdate();
    if (this.nodeName === 'fragment') {
      for (const child of this.children) {
          child.update();
      }
    } else {
      this.render(); // setStyleObj, setAttrObj
      // 如CollapsibleBox中，contents重新赋值后，children会变，而childNodes是不变的。
      for (const child of this.children) {
        // this.renderChild(child);
        child.update();
      }
    }
    this.updated && this.updated();
    this.preEvents();
    // fragment 可以设置监听事件。但监听的dom对象不是fragment的dom。
    // this.initEvents && this.initEvents();
  }

  /**
   * 默认初始化方法
   * 清理多余的对象。
   * TODO 应该叫 preCreateInstance
   * @param literal
   */
  createInstance(literal: ITypeElement): void {
    this.ctrl.resetAttrObj(literal.params?.attrObj);
    this.ctrl.resetStyleObj(literal.params?.styleObj);
    const length = literal.childNodes.length;
    if (length < this.length) {
      for (let i = 0; i < this.length; i++) {
        // this.childNodes的对象和literal.childNodes的字面量要对应。
        //    如果不一致，应该清除原有的对象，根据字面量的值创建相应的对象。
        if (i > length - 1) {
          if (this.childNodes[i].dom) {
            this.dom?.removeChild(this.childNodes[i].dom!);
          }
          // this.childNodes[i].dom?.remove();
        }
      }
      this.childNodes.length = length;
    }
  }

  /**
   * 添加事件
   */
  addEvents(events: Partial<IEvents>, target?: Node) {
    if (this.nodeName === 'fragment') {
      console.log('fragment cannot add events . ');
      return;
    }
    for (const key in events) {
      const eventFun = events[key as keyof IEvents];
      if (eventFun) {
        this.addEvent(key, target, eventFun);
      }
    }
  }

  addEvent(key: string, target: Node | undefined, event: IEvent) {
    const dom = target || this.dom;
    if (dom) {
      this.subscriptions.push(
        fromEvent(dom, key).subscribe((evt) => {
          event(evt, this, target);
        })
      );
    }
  }

  removeEvent(key: string, target?: Node) {
    this.subscriptions.map((item) => {
      // if (item.key === key && item.source === target) {
      // todo remove
      // }
    });
  }

  // 移除监听事件
  clearEvents(): void {
    this.subscriptions.map((item) => item.unsubscribe());
    this.subscriptions = [];
  }

  /**
   * 渲染前拦截，预处理
   */
  preRender(): void {
    // todo nodejs下没有document，Parser可能会用到
    if (!this.dom) {
      if (this.nodeName === 'fragment') {
        this.dom = undefined;
      } else {
        this.dom = document.createElement(this.nodeName);
      }
    }
    if (this.nodeName !== 'fragment') {
      if (this.className) {
        this.ctrl.addAttrClass(camelToDash(this.className));
      }
    }
    // console.log('preRender . ');
    if (this.className === 'TdInput') {
      console.log('this node is TdInput . ');
    }
    for (const [key, value] of Object.entries(this)) {
      // console.log(`${key}: ${value}`);
      if (value instanceof Observer) {
        //   绑定值
        console.log('Observer key is ', key);
      }
      if (value instanceof XProxy) {
        console.log('XProxy key is ', key);
        console.log('node is ', this);
        value.addDep(this, () =>
          this.setPropValue(key as keyof this, value.value)
        );
        //   todo 挂载监听
        // this.defineNodeProperty(this, key as keyof TypeNode, value);
      }
    }
  }

  /**
   * 初始化事件钩子
   * setConfig 时，dom可能还没有创建；
   */
  preEvents(): void {
    this.clearEvents();
    if (this.props?.events) {
      // dom 监听事件要挂载到真实dom上。
      this.addEvents(this.props.events);
    }
  }

  initEvents?(): void;

  /**
   * 渲染方法
   * 要调用 this.clearChildDom
   * WebPage要另外处理
   */
  render(): void {
    // console.log('this.props.styleObj is ', this.props.styleObj);
    this.preRender();
    this.clearChildrenDom(); // 清理子节点的DOM
    if (this.nodeName !== 'fragment') {
      this.ctrl.setStyleObj(this.props.styleObj);
      this.ctrl.setAttrObj(this.props.attrObj);
    } else {
      console.error('fragment should not render .');
    }
    // console.log('this.dom is ', this.dom);
    this.rendered = true;
  }

}
