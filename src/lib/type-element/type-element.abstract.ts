import { Subscription } from 'rxjs';
import { humpToMiddleLine } from '@type-dom/utils';
import { RouterView } from '../router/router-view/router-view.class';
import type { ITypeConfig } from '../type-node/type-node.interface';
import { TypeNode } from '../type-node/type-node.abstract';
import { TextNode } from '../text-node/text-node.class';
import { StyleCursor, StyleDisplay } from '../style/style.enum';
import type { IStyle } from '../style/style.interface';
import type {
  ITypeAttribute,
  IBoundBox,
  ITypeElement
} from './type-element.interface';

const vHash = Math.round(Math.random() * 1000000);

/**
 * 虚拟元素Element的数据结构
 * 可以对应到虚拟dom树。 createDom(tag, attr, children)
 * 与对应的导出时的数据结构是不一样的。
 * todo 是否需要把相关的操作也添加进来。
 */
export abstract class TypeElement extends TypeNode implements ITypeElement {
  abstract override className: string; // 必然有；
  abstract override dom?: HTMLElement | SVGElement; // 不会是Text；
  abstract override nodeName: string; // 必然有；
  parent?: TypeElement;
  nodeValue: undefined;
  override attrObj: Partial<ITypeAttribute>;
  override styleObj: Partial<IStyle>;
  // attributes: INodeAttr[];
  childNodes: TypeNode[];
  routerView?: RouterView;
  override events: Subscription[];

  initEvents?(): void;

  protected constructor() {
    super();
    this.attrObj = {};
    this.styleObj = {};
    this.addAttrObj({
      ['data-v-' + vHash]: true,
    });
    // this.nodeName = nodeName;
    this.attributes = [];
    this.childNodes = [];
    this.events = [];
  }

  // 获取包含methods属性的组件
  // 对应到包含template的组件
  get itemMethods(): Record<string, any> | undefined {
    if (this.methods) {
      return this.methods;
    } else if (this.parent === this) {
      // todo 这是？？？
      // parent === this 有几种情况 ？？？
      return this.methods;
    } else {
      return this.parent?.itemMethods;
    }
  }

  get itemData(): Record<string, any> | undefined {
    if (this.data) {
      return this.data;
    } else if (this.parent === this) {
      return this.data;
    } else if (this.parent) {
      return this.parent.itemData;
    } else {
      return undefined;
    }
  }

  get length(): number {
    return this.children.length;
  }

  get index(): number {
    return this.parent ? this.parent.findChildIndex(this) : -1;
  }

  get id(): string {
    return this.attrObj?.id as string;
  }

  // get clientHeight(): string {
  //   return (this.dom.clientHeight / mm2pxRatio).toFixed(2) + "mm"; // px ---> mm
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
  //   return this.attrObj.value ? this.attrObj.value as string : undefined;
  // }
  // set value(str: string | undefined) {
  //   if (str !== undefined) {
  //     this.setAttrObj({
  //       value: str,
  //     });
  //   } else {
  //     this.removeAttribute('value');
  //   }
  // }

  get boundBox(): IBoundBox {
    if (this.dom === undefined) {
      return {
        left: '0',
        top: '0',
        width: '0',
        height: '0',
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

  setConfig(config?: Partial<ITypeConfig>) {
    if (config?.parent) {
      this.parent = config.parent;
    }
    if (config?.name) {
      this.addAttrName(config.name);
    }
    if (config?.text) {
      // 先判断子元素是否有TextNode，有的话就不再添加
      const textNode = this.findNode('TextNode') as TextNode;
      if (textNode) {
        textNode.setText(config.text);
      } else {
        this.addChild(new TextNode(config.text));
      }
    }
    if (config?.attrObj) {
      this.addAttrObj(config.attrObj);
    }
    if (config?.styleObj) {
      this.addStyleObj(config.styleObj);
    }
    if (config?.childNodes) {
      this.addChildren(...config.childNodes);
    }
  }

  setCursor(cursor: StyleCursor) {
    this.setStyleObj({
      cursor,
    });
  }

  /**
   * 重新设置属性 会清理原有属性
   * @param propObj
   */
  resetPropObj(propObj: { attrObj: Partial<ITypeAttribute>; styleObj: Partial<IStyle> }): void {
    // if (this.propObj) {
    //   // 清理原有属性
    //   for (const key in this.attrObj) {
    //     this.removeAttribute(key);
    //   }
    //   this.dom?.removeAttribute('style');
    // }
    // this.propObj = propObj;
    this.resetAttrObj(propObj.attrObj);
    this.resetStyleObj(propObj.styleObj);
  }

  /**
   * 设置样式对象
   * 替换已有的样式；
   * 没有传的样式，不变；
   * @param styleObj
   */
  setStyleObj(styleObj: Partial<IStyle>): void {
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        // todo 如何优化
        const value = styleObj[key as keyof IStyle] as
          | string
          | number
          | boolean;
        this.setStyle(key as keyof IStyle, value);
      }
    }
  }

  /**
   * 添加样式对象；
   * @param styleObj
   */
  addStyleObj(styleObj: Partial<IStyle>): void {
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        // todo 如何优化
        const value = styleObj[key as keyof IStyle] as
          | string
          | number
          | boolean;
        this.addStyle(key as keyof IStyle, value);
      }
    }
  }

  /**
   * 重置样式
   * 清除原有样式，全部替换为新的样式
   * @param styleObj
   */
  resetStyleObj(styleObj: Partial<IStyle>): void {
    this.styleObj = styleObj;
    this.dom?.removeAttribute('style'); // 需要单独清理一下DOM的style
    this.setStyleObj(styleObj);
  }

  renderStyleObj(styleObj: Partial<IStyle>): void {
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        // todo 如何优化
        const value = styleObj[key as keyof IStyle] as
          | string
          | number
          | boolean;
        this.renderStyle(key as keyof IStyle, value);
      }
    }
  }

  setStyle(key: keyof IStyle, value: string | number | boolean): void {
    // todo type ???
    if (value !== undefined) {
      this.addStyle(key, value);
      // 直接dom操作
      this.renderStyle(key, value);
    } else {
      // todo 空字符怎么处理？
      this.removeStyle(key);
    }
  }

  addStyle(key: keyof IStyle, value: string | number | boolean): void {
    // (this.styleObj as Record<string, string | number | boolean>)[key] =
    //   value;
    Object.assign(this.styleObj, { [key]: value });
    // Object.defineProperty(this.styleObj, key, {
    //   value: value,
    //   writable: true,
    //   enumerable: true,
    //   configurable: true
    // });
  }

  renderStyle(key: keyof IStyle, value: string | number | boolean): void {
    this.dom?.style.setProperty(humpToMiddleLine(key), String(value)); // 要转中划线
  }

  // 删除样式
  removeStyle(key: keyof IStyle): void {
    if (this?.styleObj[key]) {
      delete this.styleObj[key];
    }
    this.dom?.style.removeProperty(humpToMiddleLine(key));
    // delete this.dom.style[key as keyof CSSStyleDeclaration];
  }

  /**
   * 默认显示是  block
   * 可指定具体显示模式
   * @param mode
   */
  show(mode?: StyleDisplay): void {
    this.setStyle('display', mode || 'block'); // flex block inline-block
  }

  hide(): void {
    this.setStyle('display', 'none');
  }

  // 不影响已有的，但是没有传的属性
  setAttrObj(attrObj: Partial<ITypeAttribute>): void {
    for (const key in attrObj) {
      if (Object.hasOwnProperty.call(attrObj, key)) {
        // todo 如何优化
        const value = attrObj[key] as string | number;
        this.setAttribute(key, value);
      }
    }
  }

  addAttrObj(attrObj: Partial<ITypeAttribute>): void {
    for (const key in attrObj) {
      if (Object.hasOwnProperty.call(attrObj, key)) {
        const value = attrObj[key] as string | number;
        this.addAttribute(key, value);
      }
    }
  }

  /**
   * 重置属性
   * 清理原有属性，
   * @param attrObj
   */
  resetAttrObj(attrObj: Partial<ITypeAttribute>): void {
    this.attrObj = attrObj;
    this.cleanAttrObj();
    this.setAttrObj(attrObj);
  }
  renderAttrObj(attrObj: Partial<ITypeAttribute>): void {
    for (const key in attrObj) {
      if (Object.hasOwnProperty.call(attrObj, key)) {
        const value = attrObj[key] as string | number;
        this.renderAttribute(key, value);
      }
    }
  }

  removeAttrObj(attrObj: Partial<ITypeAttribute>): void {
    for (const key in attrObj) {
      if (Object.hasOwnProperty.call(attrObj, key)) {
        if (this.attrObj[key]) {
          delete this.attrObj[key];
        }
        this.dom?.removeAttribute(key);
      }
    }
  }

  cleanAttrObj(): void {
    this.attrObj = {};
    // 需要专门清理一下DOM上的属性
    for (const attr in this.attrObj) {
      // if (Object.hasOwnProperty.call(this.attrObj, attr)) {
      this.dom?.removeAttribute(attr);
      // }
    }
  }

  // 设置属性 dom 属性同步变化
  setAttribute(key: string, value: string | number | boolean): void {
    this.addAttribute(key, value);
    this.renderAttribute(key, value);
  }

  // 添加属性
  addAttribute(key: string, value: string | number | boolean): void {
    this.attrObj[key] = value;
  }

  // 渲染属性
  renderAttribute(key: string, value: string | number | boolean): void {
    // dom渲染时， 驼峰转中划线连接
    if (
      key !== 'viewBox' &&
      key !== 'spreadMethod' &&
      key !== 'gradientUnits'
    ) {
      key = humpToMiddleLine(key);
    }
    if (value === true) {
      this.dom?.setAttribute(key, '');
    } else if (value === false) {
      this.dom?.removeAttribute(key);
    } else if (value === undefined) {
      // console.log('value is ', value);
      this.dom?.removeAttribute(key);
    } else {
      const val = value.toString();
      this.dom?.setAttribute(key, val);
    }
  }

  removeAttribute(key: string): void {
    if (this.attrObj[key]) {
      delete this.attrObj[key];
    }
    this.dom?.removeAttribute(key);
  }

  setAttrName(value: string): void {
    this.addAttrName(value);
    this.renderAttrName(value);
  }

  addAttrName(value: string): void {
    this.addAttribute('name', value);
  }

  renderAttrName(value: string): void {
    this.renderAttribute('name', value);
  }

  setAttrId(id: string): void {
    this.addAttrId(id);
    this.renderAttrId(id);
  }

  addAttrId(id: string): void {
    this.addAttribute('id', id);
  }

  renderAttrId(id: string): void {
    this.renderAttribute('id', id);
  }

  setAttrClass(className: string): void {
    this.addAttrClass(className);
    this.renderAttrClass(className);
  }

  addAttrClass(className: string): void {
    // 要先判断className是否已经存在
    if (this.attrObj?.class?.indexOf(className) === -1) {
      this.attrObj.class += ' ' + className;
    } else {
      this.addAttribute('class', className);
    }
  }

  renderAttrClass(className: string) {
    this.renderAttribute('class', className);
  }

  removeAttrClass(className: string): void {
    this.attrObj.class && this.attrObj.class.replace(className, '');
    this.dom?.classList.remove(className);
  }

  /**
   * 在最后位置添加一个子节点，并渲染；
   * 如果newChild.parent存在，则可能需要执行newChild?.parent.removeChild(newChild)。需要根据业务逻辑判断。
   * 渲染到dom上
   * @param newChild
   */
  // abstract appendChild(newChild: TypeElement | TextNode): TypeElement | TextNode;
  appendChild(newChild: TypeNode): void {
    newChild.setParent(this); // 如果不是子类，是其它地方的对象加过来，要重设其父类。
    this.renderChild(newChild); // todo this.render() 现在这样可能不渲染；因为自身DOM可能没有创建；
    // this.dom.appendChild(newChild.render().dom);
  }

  /**
   * 从前面添加子元素
   * @param newChild
   */
  unshiftChild(newChild: TypeNode): void {
    this.childNodes.unshift(newChild);
  }

  addChild(newChild: TypeNode): void {
    this.childNodes.push(newChild);
  }

  addChildren(...newChildren: TypeNode[]): void {
    this.childNodes.push(...newChildren);
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

  // appendChildren(newNodes: Array<TypeElement | WebText>) {
  //   this.childNodes.push(...newNodes);
  //   newNodes.map(child => child.setParent(this));
  // }

  /**
   * 在指定下标插入新的文本或节点。
   * @param child
   * @param index 要插入的目标位置
   */
  insertChild(child: TypeElement | TextNode, index: number): void {
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
  //   children.map(child => child.setParent(this));
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
        // this.dom.removeChild(this.childNodes[index + i].dom);
        this.childNodes[index + i].dom?.remove();
      }
    }
  }

  /**
   * 从父级中删除
   */
  removeFromParent(): void {
    if (this.parent) {
      this.dom?.remove(); // DOM删除
      this.parent.childNodes.splice(this.index, 1);
    } else {
      console.error('this.parent is null . ');
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

  // 清理子节点
  clearChildNodes(): void {
    this.childNodes = [];
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

  /**
   *  替换指定的子元素
   */
  replaceChild(newNode: TypeElement, oldNode: TypeElement): void {
    const index = this.childNodes.indexOf(oldNode);
    if (index > -1) {
      // 替换操作
      this.childNodes.splice(index, 1, newNode);
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
      this.dom.remove();
    } else {
      console.error('this.dom has been removed . ');
    }
  }

  // todo 子类中实现 ？？？？
  // abstract clone<T>(): T; // 复制
  // 会循环调用
  // clone(): TypeElement {
  // //   const attrObj: { [key: string]: boolean | string | number } = {};
  // //   const styleObj: Partial<IStyle> = {};
  // //   this.attrObj.forEach(((value, key) => {
  // //     attrs[key] = value
  // //   }));
  // //   for (const styleName in this.styleObj) {
  // //     styleObj[styleName] = this.styleObj[styleName];
  // //   }
  // //   // this.styleObj.forEach((value, key) => {
  // //   //   styleObj[key] = value;
  // //   // })
  // //   return new VElement(this.nodeName, {
  // //     classes: [...this.classes],
  // //     attrs,
  // //     styleObj,
  // //     childNodes: this.childNodes.map(i => i.clone())
  // //   });
  //   const literalJson = toJSON(this);
  //   console.log('literalJson is ', literalJson);
  //   // if (this.parent instanceof WebPage) {
  //   //   const obj = new ControlClassMap[this.className](this.parent);
  //   //   console.log('obj is ', obj);
  //   // }
  //   return this;
  // }

  findChildAtIndex(index: number): TypeNode | null {
    return this.childNodes[index] || null;
  }

  /**
   * 查找子节点的index
   * 注：子节点有index属性，直接child.index。 可能子节点没有设置parent。
   * @param child
   */
  findChildIndex(child: TypeElement | TextNode): number {
    return this.childNodes.findIndex((item) => item === child);
  }

  // 移除监听
  clearEvents(): void {
    this.events.map((item) => item.unsubscribe());
    this.events = [];
  }

  // 子类中有需要的地方覆写 todo
  // setConfig(config?: Record<string, any>) {
  //   if (config) {
  //     this.setAttrObj(config as Partial<ITypeAttribute>);
  //   }
  // }

  /**
   * 默认初始化方法
   * 清理多余的对象。
   * TODO 应该叫 preCreateInstance
   * @param literal
   */
  createInstance(literal: ITypeElement): void {
    this.resetAttrObj(literal.attrObj);
    this.resetStyleObj(literal.styleObj);
    const length = literal.childNodes.length;
    if (length < this.length) {
      for (let i = 0; i < this.length; i++) {
        // this.childNodes的对象和literal.childNodes的字面量要对应。
        //    如果不一致，应该清除原有的对象，根据字面量的值创建相应的对象。
        if (i > length - 1) {
          this.childNodes[i].dom?.remove();
        }
      }
      this.childNodes.length = length;
    }
  }

  /**
   * 挂载到真实DOM；
   * 需要手动挂载组件时使用，一般是挂载到框架外的DOM元素时。
   * 框架内的对象直接addChild就可以了。
   * @param el
   */
  mount(el: string | HTMLElement | ShadowRoot): TypeElement {
    if (!this.dom) {
      this.dom = document.createElement(this.nodeName);
    }
    if (el instanceof HTMLElement || el instanceof ShadowRoot) {
      el.appendChild(this.dom);
    } else {
      const appEl = document.querySelector<HTMLElement>(el);
      if (appEl) {
        appEl.appendChild(this.dom);
      } else {
        throw Error('Can not find id . ');
      }
    }
    return this;
  }

  /**
   * 生命周期
   * beforeRender 渲染前
   * render 渲染
   * afterRedner 渲染后
   */
  beforeRender?(): void;

  /**
   * 渲染方法
   * 要调用 this.clearChildDom
   * WebPage要另外处理
   */
  render(): void {
    // console.log('this.styleObj is ', this.styleObj);
    this.beforeRender && this.beforeRender(); // 渲染前处理；
    this.setStyleObj(this.styleObj);
    this.setAttrObj(this.attrObj);
    this.clearChildrenDom(); // 清理子节点的DOM
    // children/childNodes可能是不一样的。
    // 如CollapsibleBox中，contents重新赋值后，children会变，而childNodes是不变的。
    for (const child of this.children) {
      this.renderChild(child);
    }
    // console.log('this.dom is ', this.dom);
    this.afterRender && this.afterRender(); // 渲染后处理
    this.clearEvents();
    this.initEvents && this.initEvents();
  }

  afterRender?(): void;

  //   todo update 组件更新
}
