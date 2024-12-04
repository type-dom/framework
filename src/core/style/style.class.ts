import { IStyle, Property } from '@type-dom/css-type';
import { addUnit, camelToDash, colorFormat, Ratio } from '@type-dom/utils';
import { XElement } from '../../components/x-element/x-element.class';
import { TypeHtml } from '../type-html/type-html.abstract';
import { TypeSvg } from '../type-svg/type-svg.abstract';

export class Style {
  // private props: ITypeConfig;
  // private dom: HTMLElement | SVGElement | undefined;
  // private nodeName: 'fragment' | string;
  private el: TypeHtml | TypeSvg | XElement;
  private obj: IStyle;

  constructor(el: TypeHtml | TypeSvg | XElement) {
    this.el = el;
    this.obj = {};
  }

  get clientHeight(): string {
    if (this.el.dom) {
      return (this.el.dom.clientHeight / Ratio.mm2px).toFixed(2) + 'mm'; // px ---> mm
    } else {
      return '0px';
    }
  }

  /**
   * 获取dom的高度，带单位的。
   * 包括margin的高度。
   * margin 的单位 px ---> 单位换算
   */
  get elementHeight(): string | undefined {
    if (!this.el.dom || !(this.el.dom instanceof HTMLElement)) {
      return;
    }
    const style = getComputedStyle(this.el.dom);
    const marginTop = parseFloat(style.marginTop);
    const marginBottom = parseFloat(style.marginBottom);
    const itemHeight = this.el.dom.offsetHeight + marginTop + marginBottom;
    return (itemHeight / Ratio.mm2px).toFixed(2) + 'mm'; // px ---> mm
  }

  get isShow() {
    return 'none' !== this.el.dom?.style?.display;
  }

  get<T>(key: keyof IStyle): T {
    return this.obj[key] as T;
  }

  getObj() {
    return this.obj;
  }

  /**
   * 添加样式对象；
   * todo mergeObj,现在的方法更接近与mergeObj；
   *    fluentUI中使用了 mergeStyles 方法；
   * @param styleObj
   */
  addObj(styleObj?: IStyle): void {
    if (!styleObj) return;
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        // todo 如何优化
        const value = styleObj[key as keyof IStyle];
        this.add(key as keyof IStyle, value);
      }
    }
  }

  add(key: keyof IStyle, value: string | number | boolean | undefined): void {
    if (!this.obj) {
      console.warn('this.obj is undefined .');
      return;
    }
    if (value === undefined) {
      delete this.obj[key];
    } else {
      // this.obj[key] = value as any;
      Object.assign(this.obj, { [key]: value });
    }
    // Object.defineProperty(this.obj, key, {
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
   * @throws 如果this.el.dom为null，则抛出错误，指示元素不存在。
   */
  private render(key: keyof IStyle, value: string | number): void {
    // 当样式属性为width或height时，确保值以px为单位
    // todo width height 等属性是数字时的处理
    //    padding margin 等类似的数字值的处理
    if (key === 'width' || key === 'height'
      || key === 'right' || key === 'top'
      || key === 'bottom' || key === 'left'
    ) {
      value = addUnit(value);
    }
    // 检查dom元素是否存在，如果不存在则抛出错误
    if (!this.el.dom) {
      this.el.dom = document.createElement(this.el.nodeName);
    }
    const dom = this.el.dom;
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
  set(key: keyof IStyle, value: string | number | undefined): void {
    // 当值为undefined时，调用removeStyle方法来删除这个样式属性
    // todo type ???
    if (value === undefined) {
      // todo 空字符怎么处理？
      this.remove(key);
    } else {
      // 当值不为undefined时，先调用addStyle方法来添加或更新这个样式属性
      this.add(key, value);
      // 然后调用renderStyle方法来立即渲染这个样式的更新
      // 直接dom操作
      this.render(key, value);
    }
  }

  // 删除样式
  remove(key: keyof IStyle): void {
    if (this.getObj() && this.getObj()?.[key]) {
      delete this.getObj()?.[key];
    }
    if (this.el.dom) {
      this.el.dom?.style.removeProperty(camelToDash(key));
      // delete this.el.dom.style[key as keyof CSSStyleDeclaration];
    }
  }

  /**
   * 设置样式对象
   * 替换已有的样式；
   * 没有传的样式，不变；
   * @param styleObj
   */
  setObj(styleObj?: IStyle): void {
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        // todo 如何优化
        const value = styleObj?.[key as keyof IStyle];
        this.set(key as keyof IStyle, value);
      }
    }
    // todo 样式一次性渲染。下面的代码 Tag 组件checkable 有问题；
    // const style = { ...this.obj, ...styleObj };
    // let styleString = '';
    // for (const key in style) {
    //   if (Object.hasOwnProperty.call(style, key)) {
    //     const value = style[key as keyof IStyle];
    //     if (value === undefined) {
    //       this.el.style.remove[key as keyof IStyle];
    //       continue;
    //     }
    //     styleString += `${camelToDash(key)}:${value};`;
    //   }
    // }
    // this.el.dom?.setAttribute('style', styleString);
  }

  addWidth(width: string | number): void {
    this.addObj({ width: addUnit(width) });
  }

  setWidth(width: string | number): void {
    this.setObj({ width: addUnit(width) });
  }

  addHeight(height: string | number): void {
    this.addObj({ height: addUnit(height) });
  }

  setHeight(height: string | number): void {
    this.setObj({ height: addUnit(height) });
  }

  addBackgroundColor(backgroundColor: string): void {
    this.addObj({ backgroundColor });
  }

  setBackgroundColor(backgroundColor: string): void {
    this.setObj({ backgroundColor });
  }

  setCursor(cursor: Property.Cursor) {
    this.setObj({
      cursor
    });
  }

  /**
   * 重置样式
   * 清除原有样式，全部替换为新的样式
   * @param styleObj
   */
  resetObj(styleObj?: IStyle): void {
    this.el.dom?.removeAttribute('style'); // 需要单独清理一下DOM的style
    this.clearObj();
    if (styleObj === undefined) {
      return;
    }
    if (this.el.dom) {
      this.setObj(styleObj);
    }
  }

  removeObj(styleObj: IStyle): void {
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        this.remove(key as keyof IStyle);
      }
    }
  }

  clearObj() {
    for (const key in this.obj) {
      if (Object.hasOwnProperty.call(this.obj, key)) {
        this.remove(key as keyof IStyle);
      }
    }
  }

  renderObj(styleObj?: IStyle): void {
    if (!styleObj) {
      styleObj = this.obj;
    }
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        // todo 如何优化
        const value = styleObj[key as keyof IStyle] as string | number;
        this.render(key as keyof IStyle, value);
      }
    }
  }

  /**
   * 默认显示是  block
   * 可指定具体显示模式
   * @param mode
   */
  show(mode?: Property.Display): void {
    this.set('display', mode ?? 'block'); // flex block inline-block
  }

  hide(): void {
    this.set('display', 'none');
  }

}
