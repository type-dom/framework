import { fromEvent, Subscription } from 'rxjs';
import { IStyle, Property } from '@type-dom/css-type';
import { addUnit, camelToDash, deepClone } from '@type-dom/utils';
import { IJsonDataProp, IObData } from '../../interface';
import { RouterView } from '../../router/router-view/router-view.class';
import { XProxy } from '../../observer/x-proxy/x-proxy.class';
import { Observer } from '../../observer/observer';
import { reactive } from '../../reactivity';
import { UnwrapNestedRefs } from '../../reactivity/reactive';
import { IEvents } from '../../events/events.interface';
import type { ITypeConfig } from '../type-node/type-node.interface';
import { TypeNode } from '../type-node/type-node.abstract';
import { TextNode } from '../text-node/text-node.class';
import type {
  ITypeAttribute,
  IBoundBox,
  ITypeElement
} from './type-element.interface';

export const vHash = Math.round(Math.random() * 1000000);

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
  nodeValue?: undefined;
  // attributes: INodeAttr[];
  childNodes: TypeNode[];
  routerView?: RouterView;
  textNode?: TextNode;
  config?: Partial<ITypeConfig>;
  data?: UnwrapNestedRefs<IObData>; // ITypeNode 中设置了
  // data$?: XObservable<IJsonData>;
  override attrObj: ITypeAttribute;
  override styleObj: IStyle;
  override subscriptions: Subscription[];
  // override data$?: Observer;
  modelValue?: IJsonDataProp;

  protected constructor() {
    super();
    // 免得做非空判断
    this.attrObj = {
      ['data-v-' + vHash]: true
    };
    this.styleObj = {};
    this.attributes = [];
    this.childNodes = [];
    this.subscriptions = [];
    this.beforeCreate();
  }

  // get data(): IJsonData | undefined {
  //   if (this._data) {
  //     // return createProxy(this._data);
  //     return this._data;
  //   } else {
  //     return undefined
  //   }
  // }
  //
  // set data(value: IJsonData | undefined) {
  //   this._data = value;
  //   if (this._data && value) {
  //     // this.data$ = observe(value);
  //     // this._data['__ob__'] = observe(value);
  //     // defineReactive(this, 'data', value, undefined, false, false, true)
  //     this._data = createProxy(value);
  //   }
  // }

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
        left: 0,
        top: 0,
        width: 0,
        height: 0
      };
    }
    const { left, top, width, height } = this.dom.getBoundingClientRect();
    // console.log('left is ', left, 'top is ', top, 'width is ', width, 'height is ', height);
    return {
      left: left + 'px',
      top: top + 'px',
      width: width + 'px',
      height: height + 'px'
    };
  }

  /**
   * 设置元素的插槽。
   *
   * 此函数用于向指定的元素添加或前置插入子元素。通过参数`type`来决定是添加（默认）还是前置插入子元素。
   * `slot`参数可以是一个或多个子元素，根据`type`的不同，这些子元素会被添加到元素的末尾或前置到元素的开头。
   *
   * @param element 要添加或插入子元素的目标元素。
   * @param slot 要添加或插入的子元素或子元素数组。
   * @param type 操作类型，可选值为`add`（默认）或`unshift`，分别代表添加和前置插入子元素。
   */
  setSlot(
    element: TypeElement,
    slot: TypeNode | TypeNode[],
    type: 'add' | 'unshift' = 'add'
  ) {
    if (type === 'unshift') {
      if (slot instanceof TypeNode) {
        element.unshiftChild(slot);
      } else {
        element.unshiftChildren(...slot);
      }
    } else {
      if (slot instanceof TypeNode) {
        element.addChild(slot);
      } else {
        element.addChildren(...slot);
      }
    }
  }

  setConfig(config?: ITypeConfig) {
    this.config = config;
    if (config?.parent) {
      this.parent = config.parent;
    }
    if (config?.to) {
      this.to = config.to;
    }
    if (config?.ref !== undefined) {
      config.ref.value = this;
    }
    if (config?.name) {
      this.addAttrName(config.name);
    }
    if (config?.text) { // 添加文本
      // 先判断子元素是否有TextNode，有的话就不再添加
      // 要this.textNode 而不是其它的 TextNode;
      if (this.textNode) {
        this.textNode.setText(config.text);
        if (this.findChildIndex(this.textNode) === -1) {
          this.addChild(this.textNode);
        }
      } else {
        this.textNode = new TextNode(config.text);
        this.addChild(this.textNode);
      }
      this.textNode.setParent(this);
    }
    this.addPropObj(config);

    if (config?.data) {
      // this.setDataObservable(config.data);
      this.data = reactive(config.data);
      // console.log('this.data$ is ', this.data$);
    }
    if (config?.childNodes) {
      // 父元素为当前元素，子元素为config.childNodes
      config.childNodes.forEach((item) => {
        item.parent = this;
        this.addChild(item);
      });
      // this.childNodes = config.childNodes;
      // this.addChildren(...config.childNodes);
    }
  }

  // setBindData<T extends IJsonData>(data: T) {
  //   this.data = data;
  // }
  // setProxy <T extends IJsonData>(data: IJsonData): void {
  //   this.data = new XProxy(data);
  // }

  // setDataObservable(data: IJsonData) {
  //   console.log('setDataObservable . ');
  //   this.data = data;
  //   // this.data$ = new XObservable(data);
  // }

  // setDataItem(key: string, value: IJsonDataProp) {
  //   this.data$?.setDataItem(key, value);
  // }

  addWidth(width: string | number): void {
    this.addStyleObj({ width: addUnit(width) });
  }

  setWidth(width: string | number): void {
    this.setStyleObj({ width: addUnit(width) });
  }

  addHeight(height: string | number): void {
    this.addStyleObj({ height: addUnit(height) });
  }

  setHeight(height: string | number): void {
    this.setStyleObj({ height: addUnit(height) });
  }

  addBackgroundColor(backgroundColor: string): void {
    this.addStyleObj({ backgroundColor });
  }

  setBackgroundColor(backgroundColor: string): void {
    this.setStyleObj({ backgroundColor });
  }

  setCursor(cursor: Property.Cursor) {
    this.setStyleObj({
      cursor
    });
  }

  addPropObj(config?: ITypeConfig) {
    if (config?.attrObj) {
      this.addAttrObj(config.attrObj);
    }
    if (config?.styleObj) {
      this.addStyleObj(config.styleObj);
    }
  }

  /**
   * 重新设置属性 会清理原有属性
   * @param propObj
   */
  resetPropObj(propObj: { attrObj: ITypeAttribute; styleObj: IStyle }): void {
    this.resetAttrObj(propObj.attrObj);
    this.resetStyleObj(propObj.styleObj);
  }

  /**
   * 设置样式对象
   * 替换已有的样式；
   * 没有传的样式，不变；
   * @param styleObj
   */
  setStyleObj(styleObj: IStyle): void {
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        // todo 如何优化
        const value = styleObj[key as keyof IStyle] as string | number;
        this.setStyle(key as keyof IStyle, value);
      }
    }
  }

  /**
   * 添加样式对象；
   * todo mergeStyleObj,现在的方法更接近与mergeStyleObj；
   *    fluentUI中使用了 mergeStyles 方法；
   * @param styleObj
   */
  addStyleObj(styleObj: IStyle): void {
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
  resetStyleObj(styleObj: IStyle): void {
    this.styleObj = styleObj;
    this.dom?.removeAttribute('style'); // 需要单独清理一下DOM的style
    this.setStyleObj(styleObj);
  }

  removeStyleObj(styleObj: IStyle): void {
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        this.removeStyle(key as keyof IStyle);
      }
    }
  }

  renderStyleObj(styleObj: IStyle): void {
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        // todo 如何优化
        const value = styleObj[key as keyof IStyle] as string | number;
        this.renderStyle(key as keyof IStyle, value);
      }
    }
  }

  /**
   * 设置元素的样式。
   *
   * 此方法用于根据给定的键和值来更新元素的样式。如果值为`undefined`，则此方法将删除该样式的属性；
   * 否则，它将添加新的样式属性并立即渲染更新。
   * 此方法会渲染到dom上
   * @param key 样式属性的键，对应于`IStyle`接口中的属性名。
   * @param value 样式属性的值，可以是字符串、数字或布尔值。
   */
  setStyle(key: keyof IStyle, value: string | number): void {
    // 当值为undefined时，调用removeStyle方法来删除这个样式属性
    // todo type ???
    if (value === undefined) {
      // todo 空字符怎么处理？
      this.removeStyle(key);
    } else {
      // 当值不为undefined时，先调用addStyle方法来添加或更新这个样式属性
      this.addStyle(key, value);
      // 然后调用renderStyle方法来立即渲染这个样式的更新
      // 直接dom操作
      this.renderStyle(key, value);
    }
  }

  addStyle(key: keyof IStyle, value: string | number | boolean): void {
    // 检查styleObj是否已初始化，避免调用方法时由于this.styleObj为null或undefined导致的异常
    if (!this.styleObj) {
      throw new Error('styleObj is not initialized.');
    }

    Object.assign(this.styleObj, { [key]: value });
    // Object.defineProperty(this.styleObj, key, {
    //   value: value,
    //   writable: true,
    //   enumerable: true,
    //   configurable: true
    // });
  }

  /**
   * 根据给定的样式键和值，渲染元素的样式。
   * @param key 样式属性的名称，必须是IStyle接口中定义的属性名。
   * @param value 样式属性的值，可以是字符串、数字或布尔值。
   * @throws 如果this.dom为null，则抛出错误，指示元素不存在。
   */
  renderStyle(key: keyof IStyle, value: string | number): void {
    // 当样式属性为width或height时，确保值以px为单位
    // todo width height 等属性是数字时的处理
    //    padding margin 等类似的数字值的处理
    if (key === 'width' || key === 'height') {
      value = addUnit(value);
    }
    // 检查dom元素是否存在，如果不存在则抛出错误
    if (!this.dom) {
      throw Error(
        'this.dom is null . this element className is ' + this.className
      );
    }
    // 使用CSS属性名，并将值转换为字符串，然后设置到元素的样式中
    this.dom.style.setProperty(camelToDash(key), String(value)); // 要转中划线
  }

  // 删除样式
  removeStyle(key: keyof IStyle): void {
    if (this?.styleObj[key]) {
      delete this.styleObj[key];
    }
    this.dom?.style.removeProperty(camelToDash(key));
    // delete this.dom.style[key as keyof CSSStyleDeclaration];
  }

  /**
   * 默认显示是  block
   * 可指定具体显示模式
   * @param mode
   */
  show(mode?: Property.Display): void {
    this.setStyle('display', mode ?? 'block'); // flex block inline-block
  }

  hide(): void {
    this.setStyle('display', 'none');
  }

  // 不影响已有的属性，但是没有传的属性
  setAttrObj(attrObj: ITypeAttribute): void {
    for (const key in attrObj) {
      if (Object.hasOwnProperty.call(attrObj, key)) {
        // todo 如何优化
        const value = attrObj[key] as string | number;
        this.setAttribute(key, value);
      }
    }
  }

  addAttrObj(attrObj: ITypeAttribute): void {
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
  resetAttrObj(attrObj: ITypeAttribute): void {
    this.attrObj = attrObj;
    this.cleanAttrObj();
    this.setAttrObj(attrObj);
  }

  renderAttrObj(attrObj: ITypeAttribute): void {
    for (const key in attrObj) {
      if (Object.hasOwnProperty.call(attrObj, key)) {
        const value = attrObj[key] as string | number;
        this.renderAttribute(key, value);
      }
    }
  }

  removeAttrObj(attrObj: ITypeAttribute): void {
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
      key = camelToDash(key);
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

  addAttrId(id: string | number): void {
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
    if (this.attrObj?.class && this.attrObj.class.indexOf(className) === -1) {
      this.attrObj.class += ' ' + className + '-' + vHash;
    } else {
      this.addAttribute('class', className + '-' + vHash);
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
   * 添加事件
   */
  addEvents(events: Partial<IEvents>) {
    for (const key in events) {
      const eventFun = events[key as keyof IEvents];
      if (this.dom) {
        this.subscriptions.push(
          fromEvent(this.dom, key).subscribe((evt) => {
            if (eventFun) {
              eventFun(evt, this);
            }
          })
        );
      }
    }
  }

  // 移除监听事件
  clearEvents(): void {
    this.subscriptions.map((item) => item.unsubscribe());
    this.subscriptions = [];
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
    this.childNodes.unshift(newChild);
  }

  unshiftChildren(...newChildren: TypeNode[]) {
    this.childNodes.unshift(...newChildren);
  }

  /**
   * 后面添加子元素
   * @param newChild
   */
  addChild(newChild: TypeNode): void {
    this.childNodes.push(newChild);
  }

  /**
   * 新增子元素，并设定parent
   * @param newChildren
   */
  addChildren(...newChildren: TypeNode[]): void {
    newChildren.forEach((child) => child.appendParent(this));
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
    child.appendParent(this);
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

  findChildAtIndex(index: number): TypeNode | null {
    return this.childNodes[index] ?? null;
  }

  /**
   * 查找子节点的index
   * 注：子节点有index属性，直接child.index。 可能子节点没有设置parent。
   * @param child
   */
  findChildIndex(child: TypeElement | TextNode): number {
    return this.childNodes.findIndex((item) => item === child);
  }

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
   * beforeCreate 渲染前
   * created 渲染前
   * render 渲染
   * afterRender 渲染后
   * mounted 挂载后
   */
  beforeCreate() {
    /**/
  }

  /**
   * created函数用于在渲染TypeElement之前进行准备工作。
   * 该函数不接受参数，也不返回任何值。
   * 主要完成以下工作：
   * 1. 打印日志说明当前处于created阶段。
   * 2. 检查dom属性是否已存在，若不存在，则创建一个新的DOM元素。
   * 3. 遍历当前Element的所有属性，对以':'和'@'开头的属性进行特殊处理。
   */
  created() {
    /**/
  }

  /**
   * 渲染前拦截，预处理
   */
  preRender() {
    // todo nodejs下没有document，Parser可能会用到
    if (!this.dom) {
      this.dom = document.createElement(this.nodeName);
    }
    // console.log('preRender . ');
    if (this.className === 'TdInput') {
      console.log('this node is TdInput . ');
    }
    if (this.className) {
      this.addAttrClass(camelToDash(this.className));
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
  preEvents() {
    this.clearEvents();
    if (this.config?.events) {
      this.addEvents(this.config.events);
    }
  }

  initEvents?(): void;

  /**
   * 渲染方法
   * 要调用 this.clearChildDom
   * WebPage要另外处理
   */
  render(): void {
    this.created && this.created();
    // console.log('this.styleObj is ', this.styleObj);
    this.preRender();
    this.setStyleObj(this.styleObj);
    this.setAttrObj(this.attrObj);
    this.clearChildrenDom(); // 清理子节点的DOM
    // children/childNodes可能是不一样的。
    // 如CollapsibleBox中，contents重新赋值后，children会变，而childNodes是不变的。
    for (const child of this.children) {
      this.renderChild(child);
    }
    // console.log('this.dom is ', this.dom);
    this.mounted && this.mounted(); // 渲染后处理
    if (this?.to) {
      this.mount(this.to);
    }
    this.preEvents();
    this.initEvents && this.initEvents();
  }

  /**
   * 可选的函数，无参数，无返回值。
   * 该函数用于在渲染完成后执行一些额外的操作。
   * 如果需要在特定条件下执行渲染完成后的操作，可以实现此函数。
   * 在子类中覆写
   */
  mounted?(): void;

  //   todo update 组件更新
}
