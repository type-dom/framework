import { addUnit, camelToDash, colorFormat } from '@type-dom/utils';
import { IStyle, Property } from '@type-dom/css-type';
import { ITypeConfig } from '../type-node/type-node.interface';
import { ITypeAttribute } from './type-element.interface';
import { TypeElement, vHash } from './type-element.abstract';

/**
 * 属性控制器，方法的集合
 * @param element 挂载的元素
 */
export class TypeElementController {
  protected element: TypeElement;

  constructor(element: TypeElement) {
    this.element = element;
  }

  // Prop
  addPropObj<T extends ITypeConfig>(config?: T) {
    if (config?.attrObj) {
      this.addAttrObj(config.attrObj);
    }
    if (config?.styleObj) {
      this.addStyleObj(config.styleObj);
    }
    return this.element.getProps<T>() as T;
  }

  /**
   * 重新设置属性 会清理原有属性
   * @param propObj
   */
  resetPropObj(propObj: {
    attrObj?: ITypeAttribute | undefined;
    styleObj?: IStyle | undefined;
  }): void {
    this.resetAttrObj(propObj.attrObj);
    this.resetStyleObj(propObj.styleObj);
  }

  // AttrObj
  setAttrObj(attrObj?: ITypeAttribute): void {
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
  resetAttrObj(attrObj?: ITypeAttribute): void {
    if (attrObj === undefined) {
      return;
    }
    this.element.props.attrObj = attrObj;
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
        if (this.element.getProps().attrObj?.[key]) {
          delete this.element.getProps().attrObj?.[key];
        }
        if (this.element.dom) {
          this.element.dom?.removeAttribute(key);
        }
      }
    }
  }

  cleanAttrObj(): void {
    // 需要专门清理一下DOM上的属性
    for (const attr in this.element.getProps().attrObj) {
      // if (Object.hasOwnProperty.call(this.props.attrObj, attr)) {
      if (this.element.dom) {
        this.element.dom.removeAttribute(attr);
      }
      // }
    }
    this.element.getProps().attrObj = {};
  }

  // 设置属性 dom 属性同步变化
  setAttribute(key: string, value: string | number | boolean): void {
    this.addAttribute(key, value);
    this.renderAttribute(key, value);
  }

  // 添加属性
  addAttribute(key: string, value: string | number | boolean): void {
    this.element.getAttrObj()[key] = value;
  }

  // 渲染属性
  //  todo 如何新的属性值和原来的属性值一样，要拦截掉。
  renderAttribute(key: string, value: string | number | boolean): void {
    // dom渲染时， 驼峰转中划线连接
    if (
      key !== 'viewBox' &&
      key !== 'spreadMethod' &&
      key !== 'gradientUnits'
    ) {
      key = camelToDash(key);
    }
    if (!this.element.dom) {
      this.element.dom = document.createElement(this.element.nodeName);
    }
    const dom = this.element.dom;
    if (dom) {
      if (value === true) {
        if (dom.getAttribute(key) === '') {
          return;
        }
        dom.setAttribute(key, '');
      } else if (value === false) {
        if (!dom.getAttribute(key)) {
          return;
        }
        dom.removeAttribute(key);
      } else if (value === undefined) {
        // console.log('value is ', value);
        if (!dom.getAttribute(key)) {
          return;
        }
        dom.removeAttribute(key);
      } else {
        const val = value.toString();
        if (dom.getAttribute(key) === val) {
          return;
        }
        dom.setAttribute(key, val);
      }
    }
  }

  removeAttribute(key: string): void {
    if (this.element.getProps().attrObj?.[key]) {
      delete this.element.getAttrObj()[key];
    }
    if (this.element.dom) {
      this.element.dom.removeAttribute(key);
    }
  }

  setAttrName(value: string): void {
    this.addAttrName(value);
    this.renderAttrName(value);
  }

  addAttrName(value: string | number): void {
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
    if (this.element.getAttrObj().class && this.element.getAttrObj()?.class?.indexOf(className) === -1) {
      this.element.getAttrObj().class += ' ' + className + '-' + vHash;
    } else {
      this.addAttribute('class', className + '-' + vHash);
    }
  }

  renderAttrClass(className: string) {
    this.renderAttribute('class', className);
  }

  removeAttrClass(className: string): void {
    this.element.getAttrObj()?.class && this.element.getAttrObj()?.class?.replace(className, '');
    this.element.dom?.classList.remove(className);
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
        const value = styleObj[key as keyof IStyle];
        this.addStyle(key as keyof IStyle, value);
      }
    }
  }

  addStyle(
    key: keyof IStyle,
    value: string | number | boolean | undefined
  ): void {
    // 检查styleObj是否已初始化，避免调用方法时由于this.props.styleObj为null或undefined导致的异常
    if (!this.element.props.styleObj) {
      // console.error('styleObj is not initialized.');
      this.element.props.styleObj = {};
    }
    // this.element.props.styleObj[key] = value;
    Object.assign(this.element.props.styleObj, { [key]: value });
    // Object.defineProperty(this.props.styleObj, key, {
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
   * @throws 如果this.element.dom为null，则抛出错误，指示元素不存在。
   */
  renderStyle(key: keyof IStyle, value: string | number): void {
    // 当样式属性为width或height时，确保值以px为单位
    // todo width height 等属性是数字时的处理
    //    padding margin 等类似的数字值的处理
    if (key === 'width' || key === 'height') {
      value = addUnit(value);
    }
    // 检查dom元素是否存在，如果不存在则抛出错误
    if (!this.element.dom) {
      this.element.dom = document.createElement(this.element.nodeName);
    }
    const dom = this.element.dom;
    if (dom) {
      // 拦截已经配置的相同的样式值的样式设置
      //  todo color 会转为 rgb 格式
      // 颜色单独处理
      if (key === 'color') {
        const color = dom.style.color;
        if (colorFormat(color) === colorFormat(String(value))) {
          return;
        }
      }
      if (dom.style.getPropertyValue(camelToDash(key)) === String(value)) {
        return;
      }
      // 使用CSS属性名，并将值转换为字符串，然后设置到元素的样式中
      dom.style.setProperty(camelToDash(key), String(value)); // 要转中划线
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
  setStyle(key: keyof IStyle, value: string | number | undefined): void {
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

  // 删除样式
  removeStyle(key: keyof IStyle): void {
    if (this.element.getStyleObj() && this.element.getStyleObj()?.[key]) {
      delete this.element.getStyleObj()?.[key];
    }
    if (this.element.dom) {
      this.element.dom?.style.removeProperty(camelToDash(key));
      // delete this.element.dom.style[key as keyof CSSStyleDeclaration];
    }
  }

  /**
   * 设置样式对象
   * 替换已有的样式；
   * 没有传的样式，不变；
   * @param styleObj
   */
  setStyleObj(styleObj?: IStyle): void {
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        // todo 如何优化
        const value = styleObj[key as keyof IStyle];
        this.setStyle(key as keyof IStyle, value);
      }
    }
    // todo 样式一次性渲染。下面的代码 Tag 组件checkable 有问题；
    // const style = { ...this.props.styleObj, ...styleObj };
    // let styleString = '';
    // for (const key in style) {
    //   if (Object.hasOwnProperty.call(style, key)) {
    //     const value = style[key as keyof IStyle];
    //     if (value === undefined) {
    //       delete this.props.styleObj[key as keyof IStyle];
    //       continue;
    //     }
    //     styleString += `${camelToDash(key)}:${value};`;
    //   }
    // }
    // this.element.dom?.setAttribute('style', styleString);
  }

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
      cursor,
    });
  }

  /**
   * 重置样式
   * 清除原有样式，全部替换为新的样式
   * @param styleObj
   */
  resetStyleObj(styleObj?: IStyle): void {
    this.element.dom?.removeAttribute('style'); // 需要单独清理一下DOM的style
    delete this.element.props.styleObj;
    if (styleObj === undefined) {
      return;
    }
    if (this.element.dom) {
      this.setStyleObj(styleObj);
    }
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
}
