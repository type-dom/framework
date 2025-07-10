import {  Property } from '@type-dom/css-type';

import {
  addUnit,
  // camelToDash,
  colorFormat,
  getStyle,
  isArray,
  isString,
  removeStyle,
  setStyle, isUndefined,
  Ratio
} from '@type-dom/utils';
import { effect } from '@type-dom/signals';
import { toRaw, isRef, MaybeRef, } from '../../reactivity';
import { XElement } from '../../components/x-element/x-element.class';
import { TypeHtml } from '../type-html/type-html.abstract';
import { TypeSvg } from '../type-svg/type-svg.abstract';
import { cssStrToObj } from './cssStrToObj'; // todo 直接用 '.' 会循环依赖
import { CSSProperties, RawStyle, StyleValue } from './style.interface';

export class Style {
  private el: TypeHtml | TypeSvg | XElement;
  private obj: RawStyle;

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

  get(key: keyof CSSProperties) {
    return this.obj[key];
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
  addObj(styleObj?: StyleValue): void {
    if (!styleObj) {
      return;
    }
    let rawObj: RawStyle = {};
    if (isRef(styleObj)) {
      // rawObj = rawStyles(styleObj);
      effect(() => {
        // console.warn('styleObj effect . ');
        // console.warn('element is ', this.el);
        const newStyleObj = getRawStyles(styleObj);
        if (isUndefined(newStyleObj)) {
          this.clearObj();
        } else {
          // console.error('newStyleObj.height is ', newStyleObj.height);
          // if (newStyleObj !== rawObj) {  // 引用对象怎么会变呢？？
          this.renderObj(newStyleObj);
          // }
        }

      })
    } else {
      rawObj = doStyleValue(styleObj);
      // console.error('rawObj is ', rawObj);
    }
    for (const key in rawObj) {
      if (Object.hasOwnProperty.call(rawObj, key)) {
        // todo 如何优化
        const value = rawObj[key as keyof CSSProperties];
        this.add(key as keyof CSSProperties, value);
      }
    }
  }

  add(key: keyof CSSProperties, value: MaybeRef<string | number | undefined>): void {
    if (!this.obj) {
      // console.error('style this.obj is undefined .');
      return;
    }
    if (value === undefined) {
      delete this.obj[key];
    } else {
      (this.obj as any)[key] = value;
      // if (key === 'objectFit') {
      //   console.warn('style key is objectFit');
      // }
      // Object.assign(this.obj, { [key]: value });
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
   * @param key 样式属性的名称，必须是 CSSProperties 接口中定义的属性名。
   * @param value 样式属性的值，可以是字符串、数字或布尔值。
   * @throws 如果this.el.dom为null，则抛出错误，指示元素不存在。
   * value 是 Signal或Computed时，需要监听变化；
   */
  private render(key: keyof CSSProperties, value: MaybeRef<string | number | undefined>): void {
    let dom = this.el.dom;
    if (!dom) {
      this.el.createDom()  // 保证dom存在
      dom = this.el.dom;
    }
    if (dom) {
      // 拦截已经配置的相同的样式值的样式设置
      // effect(() => { // 验证没有任何响应式数据关联，会不会执行； 默认会执行的。
      //   console.error('nothing reactive . .........');
      // })
      const rawValue = toRaw(value);
      if (isRef(value)) {
        effect(() => {
          // 使用CSS属性名，并将值转换为字符串，然后设置到元素的样式中
          const newValue = toRaw(value);
          // console.warn('effect style key is ', key, ' newValue is ', newValue);
          this.renderRawStyle(key, newValue);
        })
      } else {
        this.renderRawStyle(key, rawValue);
      }
    }
  }

  renderRawStyle(key: string, newValue: string | number | undefined) {
    // if (key === 'flexShrink') {
    //   console.warn('flexShrink . style key')
    // }
    let dom = this.el.dom;
    if (!dom) {
      this.el.createDom()  // 保证dom存在
      dom = this.el.dom!;
    }
    if (newValue === getStyle(dom, key)) {
      return;
    }
    // 浏览器 color 会转为 rgb 格式
    // 颜色单独处理
    if (key === 'color') {
      const color = getStyle(dom, 'color');
      // 颜色有多种不同的表示方法，转为统一的颜色表示，然后进行比较
      if (colorFormat(color) !== colorFormat(String(newValue))) {
        // dom.style.setProperty(camelToDash(key), String(newValue));
        setStyle(dom, 'color', newValue);
      }
    } else {
      // 当样式属性为width或height时，确保值以px为单位
      // width height 等属性是数字时的处理
      //   todo   padding margin 等类似的数字值的处理
      if (key === 'width' || key === 'height'
        || key === 'right' || key === 'top'
        || key === 'bottom' || key === 'left'
      ) {
        if (addUnit(newValue) !== getStyle(dom, key)) {
          setStyle(dom, key, addUnit(newValue))
          // dom.style.setProperty(camelToDash(key), String(addUnit(newValue)));
        }
      } else {
        // 使用CSS属性名，并将值转换为字符串，然后设置到元素的样式中
        setStyle(dom, key, newValue)// todo Segmented 垂直时，选项切换有问题；
        // dom.style.setProperty(camelToDash(key), String(newValue));
      }
      // Object.assign(this.obj, { [key]: newValue });
    }
  }
  /**
   * 设置元素的样式。
   *
   * 此方法用于根据给定的键和值来更新元素的样式。如果值为`undefined`，则此方法将删除该样式的属性；
   * 否则，它将添加新的样式属性并立即渲染更新。
   * 此方法会渲染到dom上
   * @param key 样式属性的键，对应于`CSSProperties`接口中的属性名。
   * @param value 样式属性的值，可以是字符串、数字或布尔值。
   */
  set(key: keyof CSSProperties, value: MaybeRef<string | number | undefined>): void {
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
  remove(key: string): void {
    if (this.getObj() && this.getObj()?.[key as keyof CSSProperties]) {
      delete this.getObj()?.[key as keyof CSSProperties];
    }
    if (this.el.dom) {
      removeStyle(this.el.dom!, key);
      // this.el.dom?.style.removeProperty(camelToDash(key));
      // delete this.el.dom.style[key as keyof CSSStyleDeclaration];
    }
  }

  /**
   * 设置样式对象
   * 替换已有的样式；
   * 没有传的样式，不变；
   * @param styleObj
   */
  setObj(styleObj?: StyleValue): void {
    if (!styleObj) {
      return;
    }
    let rawObj: RawStyle;
    if (isRef(styleObj)) {
      rawObj = styleObj.get() as RawStyle;
      effect(() => {
        const newStyleObj = getRawStyles(styleObj);
        // console.error('style newStyleObj is ', newStyleObj);
        if (newStyleObj !== rawObj) {
          this.setObj(newStyleObj);
        }
      })
    } else {
      rawObj = doStyleValue(styleObj);
    }
    for (const key in rawObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        // todo 如何优化
        const value = rawObj[key as keyof CSSProperties];
        this.set(key as keyof CSSProperties, value);
      }
    }
    // todo 样式一次性渲染。下面的代码 Tag 组件checkable 有问题；
    // const style = { ...this.obj, ...styleObj };
    // let styleString = '';
    // for (const key in style) {
    //   if (Object.hasOwnProperty.call(style, key)) {
    //     const value = style[key as keyof CSSProperties];
    //     if (value === undefined) {
    //       this.el.style.remove[key as keyof CSSProperties];
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
  resetObj(styleObj?: StyleValue): void {
    this.el.dom?.removeAttribute('style'); // 需要单独清理一下DOM的style
    this.clearObj();
    if (styleObj === undefined) {
      return;
    }
    if (this.el.dom) {
      this.setObj(styleObj);
    }
  }

  removeObj(styleObj: CSSProperties): void {
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        this.remove(key as keyof CSSProperties);
      }
    }
  }

  clearObj() {
    for (const key in this.obj) {
      if (Object.hasOwnProperty.call(this.obj, key)) {
        this.remove(key as keyof CSSProperties);
      }
    }
  }

  renderObj(styleObj = this.obj): void {
    for (const key in styleObj) {
      if (Object.hasOwnProperty.call(styleObj, key)) {
        // todo 如何优化
        const value = styleObj[key as keyof CSSProperties];
        this.render(key as keyof CSSProperties, value);
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

// 应该在style类的render中使用
function getRawStyles(style: StyleValue, res: RawStyle = {}) {
  // const raw = {} as CSSProperties;
  // Helper function to convert a Record<keyof CSSProperties, MaybeRef<string | number>> to CSSProperties
  function convertRecordToIStyle(record: RawStyle): RawStyle {
    // return Object.fromEntries(
    //   Object.entries(record).map(([key, value]) => [key, toRaw(value)])
    // ) as CSSProperties;
    for (const key in record) {
      const value = toRaw(record[key as keyof RawStyle]);
      (res as any)[key] = value; // CSSProperties 的值类型太复杂了； todo optimize
    }
    return res;
  }

  if (Array.isArray(style)) {
    style.forEach(item => {
      if (isArray(item)) {
        getRawStyles(item, res);
      } else if (isRef(item)) {
         Object.assign(res, toRaw(item as StyleValue));
      } else {
         Object.assign(res, convertRecordToIStyle(item as RawStyle));
      }
    });
    return res;
  } else if (isRef(style)) {
    return getRawStyles(toRaw(style));
  } else {
    return convertRecordToIStyle(style as RawStyle);
  }
}

function doStyleValue(style?: StyleValue, resStyle: RawStyle = {}) {
  if (isString(style)) {
    Object.assign(resStyle, cssStrToObj(style));
  } else if (isArray(style)) {
    style.forEach(item => {
      doStyleValue(item, resStyle);
    });
  } else if (isRef(style)){
    Object.assign(resStyle, toRaw(style));
  } else {
    Object.assign(resStyle, style);
  }
  return resStyle;
}
