import { Property } from '@type-dom/css-type';
import {
  // camelToDash,
  colorFormat,
  isArray,
  isString,
  isUndefined,
  setDomStyle,
  getDomStyle,
  removeDomStyle,
  parseStringStyle,
  addUnit,
  // Ratio,
} from '@type-dom/utils';
import { effect } from '@type-dom/signals';
import { toRaw } from '../../../reactivity/reactive';
import { isRef, MaybeRef, } from '../../../reactivity/ref';
import { TypeProps } from '../../../core/abstracts/type-node/type-node.interface';
import { TypeNode } from '../../../core/abstracts/type-node/type-node.abstract';
import { Attributes } from '../attribute/attribute.interface';
import { CSSProperties, RawStyle, StyleValue } from './style.interface';
// import { patchStyle } from './patchStyle';

// get clientHeight(): string {
//   if ( el.dom) {
//     return ( el.dom.clientHeight / Ratio.mm2px).toFixed(2) + 'mm'; // px ---> mm
//   } else {
//     return '0px';
//   }
// }

/**
 * 获取dom的高度，带单位的。
 * 包括margin的高度。
 * margin 的单位 px ---> 单位换算
 */
// get elementHeight(): string | undefined {
//   if (! el.dom || !( el.dom instanceof HTMLElement)) {
//     return;
//   }
//   const style = getComputedStyle( el.dom);
//   const marginTop = parseFloat(style.marginTop);
//   const marginBottom = parseFloat(style.marginBottom);
//   const itemHeight =  el.dom.offsetHeight + marginTop + marginBottom;
//   return (itemHeight / Ratio.mm2px).toFixed(2) + 'mm'; // px ---> mm
// }

// get isShow() {
//   return 'none' !==  el.dom?.style?.display;
// }

// get(key: keyof CSSProperties) {
//   return el.styleObj[key];
// }

export function getStyleProp(el: TypeNode, key: keyof CSSProperties) {
  return el.styleObj?.[key];
}
export function getStyleObj(el: TypeNode) {
  return el.styleObj;
}

/**
 * 添加样式对象；
 * todo mergeObj,现在的方法更接近与mergeObj；
 *    fluentUI中使用了 mergeStyles 方法；
 * @param el
 * @param styleObj
 */
export function addStyleObj<Node extends TypeNode>(el: Node | undefined, styleObj?: StyleValue) {
  if (!el) return;
  if (!styleObj) return;
  // if (el.dom instanceof DocumentFragment) { // TypeFragment组件不会自动下传 styleObj 样式，需要下级组件手动去接收。
  //   onBeforeMount(() => {
  //     el.childNodes?.forEach(child => {
  //       addStyleObj(child, styleObj);
  //     });
  //   }, el);
  //   return;
  // }
  let rawObj: RawStyle = {};
  if (isRef(styleObj)) {
    effect(() => {
      // console.warn('styleObj effect . ');
      // console.warn('element is ', el);
      rawObj = getRawStyles(styleObj) as RawStyle;
      // console.warn('newStyleObj is  ', newStyleObj);
      if (isUndefined(rawObj)) {
        // clearStyleObj(el); // todo 如何清理样式。
      } else {
        // console.error('newStyleObj.height is ', newStyleObj.height);
        // if (newStyleObj !== rawObj) {  // 引用对象怎么会变呢？？
        renderStyleObj(el, rawObj);
        // }
      }
    });
  } else {
    rawObj = parseStyleValue(styleObj);
    // console.error('rawObj is ', rawObj);
  }
  for (const key in rawObj) {
    if (Object.hasOwnProperty.call(rawObj, key)) {
      // todo 如何优化
      const value = rawObj[key as keyof CSSProperties];
      addStyleProp(el, key as keyof CSSProperties, value);
    }
  }
}

export function addStyleProp(
  el: TypeNode | undefined,
  key: keyof CSSProperties,
  value: MaybeRef<string | number | undefined>
): void {
  if (!el) return;
  if (!el.styleObj) {
    // console.error('style el.styleObj is undefined .');
    return;
  }
  if (el.dom instanceof  DocumentFragment) { // TypeFragment组件不会自动下传 styleObj 样式，需要下级组件手动去接收。
    // el.childNodes?.forEach(child => {
    //   addStyleProp(child, key, value);
    // });
    return;
  }
  if (value === undefined) {
    delete el.styleObj[key];
  } else {
    (el.styleObj as any)[key] = value;
    // if (key === 'objectFit') {
    //   console.warn('style key is objectFit');
    // }
    // Object.assign(el.styleObj, { [key]: value });
  }
  // Object.defineProperty(el.styleObj, key, {
  //   value: value,
  //   writable: true,
  //   enumerable: true,
  //   configurable: true
  // });
}

/**
 * 根据给定的样式键和值，渲染元素的样式。
 * @param el
 * @param key 样式属性的名称，必须是 CSSProperties 接口中定义的属性名。
 * @param value 样式属性的值，可以是字符串、数字或布尔值。
 * @throws 如果 el.dom为null，则抛出错误，指示元素不存在。
 * value 是 Signal或Computed时，需要监听变化；
 */
export function renderStyleProp(
  el: TypeNode | undefined,
  key: keyof CSSProperties,
  value: MaybeRef<string | number | undefined>
) {
  if (!el) return;
  if (!el.styleObj) {
    // console.error('style el.styleObj is undefined .');
    return;
  }
  if (value === undefined) {
    delete el.styleObj[key];
  } else {
    (el.styleObj as any)[key] = value;
    // if (key === 'objectFit') {
    //   console.warn('style key is objectFit');
    // }
    // Object.assign(el.styleObj, { [key]: value });
  }

  let dom = el.dom as HTMLElement;
  if (dom) {
    // 拦截已经配置的相同的样式值的样式设置
    const rawValue = toRaw(value);
    if (isRef(value)) {
      effect(() => { // 验证没有任何响应式数据关联，会不会执行； 默认会执行的。
        // 使用CSS属性名，并将值转换为字符串，然后设置到元素的样式中
        const newValue = toRaw(value);
        // console.warn('effect style key is ', key, ' newValue is ', newValue);
        renderRawStyle(el, key, newValue);
        // patchStyle(dom, dom.style.getPropertyValue(key), String(newValue));
      });
    } else {
      renderRawStyle(el, key, rawValue);
      // patchStyle(dom, dom.style.getPropertyValue(key), String(rawValue));
    }
  }
}

export function renderRawStyle(
  el: TypeNode | undefined,
  key: string,
  newValue: string | number | undefined
) {
  if (!el) return;
  // if (key === 'flexShrink') {
  //   console.warn('flexShrink . style key')
  // }
  let dom = el.dom as HTMLElement | SVGElement;
  if (newValue === getDomStyle(dom, key)) {
    return;
  }
  // 浏览器 color 会转为 rgb 格式
  // 颜色单独处理
  if (key === 'color') {
    const color = getDomStyle(dom, 'color');
    // 颜色有多种不同的表示方法，转为统一的颜色表示，然后进行比较
    if (colorFormat(color) !== colorFormat(String(newValue))) {
      // dom.style.setProperty(camelToDash(key), String(newValue));
      setDomStyle(dom, 'color', newValue);
    }
  } else {
    // 当样式属性为width或height时，确保值以px为单位
    // width height 等属性是数字时的处理
    //   todo   padding margin 等类似的数字值的处理
    if (
      key === 'width' ||
      key === 'height' ||
      key === 'right' ||
      key === 'top' ||
      key === 'bottom' ||
      key === 'left'
    ) {
      if (addUnit(newValue) !== getDomStyle(dom, key)) {
        setDomStyle(dom, key, addUnit(newValue));
        // dom.style.setProperty(camelToDash(key), String(addUnit(newValue)));
      }
    } else {
      // 使用CSS属性名，并将值转换为字符串，然后设置到元素的样式中
      // if (newValue === undefined) {
      //   console.warn('newValue is ', newValue);
      // }
      setDomStyle(dom, key as keyof CSSProperties, newValue); // todo Segmented 垂直时，选项切换有问题；
      // dom.style.setProperty(camelToDash(key), String(newValue));
    }
    // Object.assign(el.styleObj, { [key]: newValue });
  }
}

/**
 * 设置元素的样式。
 *
 * 此方法用于根据给定的键和值来更新元素的样式。如果值为`undefined`，则此方法将删除该样式的属性；
 * 否则，它将添加新的样式属性并立即渲染更新。
 * 此方法会渲染到dom上
 * @param el
 * @param key 样式属性的键，对应于`CSSProperties`接口中的属性名。
 * @param value 样式属性的值，可以是字符串、数字或布尔值。
 */
export function setStyleProp(
  el: TypeNode | undefined,
  key: keyof CSSProperties,
  value: MaybeRef<string | number | undefined>
): void {
  if (!el) return;
  // 当值为undefined时，调用removeStyle方法来删除这个样式属性
  // todo type ???
  if (value === undefined) {
    // todo 空字符怎么处理？
    removeStyleProp(el, key);
  } else {
    // 当值不为undefined时，先调用addStyle方法来添加或更新这个样式属性
    addStyleProp(el, key, value);
    // 然后调用renderStyle方法来立即渲染这个样式的更新
    // 直接dom操作
    renderStyleProp(el, key, value);
  }
}

// 删除样式
export function removeStyleProp(el: TypeNode | undefined, key: string): void {
  if (!el) return;
  if (el.styleObj && el.styleObj[key as keyof CSSProperties]) {
    delete el.styleObj[key as keyof CSSProperties];
  }
  if (el.dom) {
    removeDomStyle(el.dom as HTMLElement, key as keyof CSSProperties);
    // el.dom?.style.removeProperty(camelToDash(key));
    // delete el.dom.style[key as keyof CSSStyleDeclaration];
  }
}

/**
 * 设置样式对象
 * 替换已有的样式；
 * 没有传的样式，不变；
 * @param el
 * @param styleObj
 */
export function setStyleObj(el: TypeNode | null | undefined, styleObj?: StyleValue): void {
  if (!el) return;
  if (!styleObj) {
    return;
  }
  if (el.dom instanceof DocumentFragment) { // 不会自动下传，需要下级手动接收。
    // el.childNodes?.forEach(child => {
    //   setStyleObj(child, styleObj);
    // });
    return;
  }
  let rawObj: RawStyle;
  if (isRef(styleObj)) {
    rawObj = styleObj.get() as RawStyle;
    effect(() => {
      const newStyleObj = getRawStyles(styleObj);
      // console.error('style newStyleObj is ', newStyleObj);
      if (newStyleObj !== rawObj) {
        setStyleObj(el, newStyleObj);
      }
    });
  } else {
    rawObj = parseStyleValue(styleObj);
  }
  for (const key in rawObj) {
    if (Object.hasOwnProperty.call(styleObj, key)) {
      // todo 如何优化
      const value = rawObj[key as keyof CSSProperties];
      setStyleProp(el, key as keyof CSSProperties, value);
    }
  }
  // todo 样式一次性渲染。下面的代码 Tag 组件checkable 有问题；
  // const style = { ...el.styleObj, ...styleObj };
  // let styleString = '';
  // for (const key in style) {
  //   if (Object.hasOwnProperty.call(style, key)) {
  //     const value = style[key as keyof CSSProperties];
  //     if (value === undefined) {
  //       el.el.style.remove[key as keyof CSSProperties];
  //       continue;
  //     }
  //     styleString += `${camelToDash(key)}:${value};`;
  //   }
  // }
  // el.dom?.setAttribute('style', styleString);
}

export function addWidth(el: TypeNode, width: string | number): void {
  addStyleObj(el, { width: addUnit(width) });
}

export function setWidth(el: TypeNode, width: string | number): void {
  setStyleObj(el, { width: addUnit(width) });
}

export function addHeight(el: TypeNode, height: string | number): void {
  addStyleObj(el, { height: addUnit(height) });
}

export function setHeight(el: TypeNode, height: string | number): void {
  setStyleObj(el, { height: addUnit(height) });
}

export function addBackgroundColor(
  el: TypeNode,
  backgroundColor: string
): void {
  addStyleObj(el, { backgroundColor });
}

export function setBackgroundColor(
  el: TypeNode,
  backgroundColor: string
): void {
  setStyleObj(el, { backgroundColor });
}

export function setCursor(el: TypeNode, cursor: Property.Cursor) {
  setStyleObj(el, {
    cursor,
  });
}

/**
 * 重置样式
 * 清除原有样式，全部替换为新的样式
 * @param el
 * @param styleObj
 */
export function resetStyleObj<Props extends TypeProps = TypeProps, Attrs extends Attributes = Attributes>(
  el: TypeNode<Props, Attrs>,
  styleObj?: StyleValue
) {
  if (!el) return;
  if (el.dom instanceof DocumentFragment) {
    //   todo
  } else {
    el.dom?.removeAttribute('style'); // 需要单独清理一下DOM的style
  }
  clearStyleObj(el);
  if (styleObj === undefined) {
    return;
  }
  if (el.dom) {
    setStyleObj(el, styleObj);
  }
}

export function removeStyleObj(el: TypeNode, styleObj: CSSProperties): void {
  if (!el) return;
  for (const key in styleObj) {
    if (Object.hasOwnProperty.call(styleObj, key)) {
      removeStyleProp(el, key as keyof CSSProperties);
    }
  }
}

export function clearStyleObj(el: TypeNode | undefined) {
  if (!el) return;
  for (const key in el.styleObj) {
    if (Object.hasOwnProperty.call(el.styleObj, key)) {
      removeStyleProp(el, key as keyof CSSProperties);
    }
  }
  if (el.dom instanceof Element) {
    el.dom.setAttribute('style', '');
  }
}

export function renderStyleObj(el: TypeNode, styleObj = el.styleObj): void {
  if (!el) return;
  for (const key in styleObj) {
    if (Object.hasOwnProperty.call(styleObj, key)) {
      // todo 如何优化
      const value = styleObj[key as keyof CSSProperties];
      renderStyleProp(el, key as keyof CSSProperties, value);
    }
  }
}

/**
 * 默认显示是  block
 * 可指定具体显示模式
 * @param el
 * @param mode
 */
export function show(el: TypeNode, mode?: Property.Display): void {
  if (!el) return;
  setStyleProp(el, 'display', mode ?? 'block'); // flex block inline-block
}

export function hide(el: TypeNode): void {
  if (!el) return;
  setStyleProp(el, 'display', 'none');
}

// 应该在style类的render中使用
function getRawStyles(style: StyleValue | undefined, res: RawStyle = {}) {
  if (!style) return undefined;
  // const raw = {} as CSSProperties;
  // Helper function to convert a Record<keyof CSSProperties, MaybeRef<string | number>> to CSSProperties
  function convertRecordToIStyle(record: RawStyle): RawStyle {
    // return Object.fromEntries(
    //   Object.entries(record).map(([key, value]) => [key, toRaw(value)])
    // ) as CSSProperties;
    // console.log('record is ', record);
    for (const key in record) {
      const value = toRaw(record[key as keyof RawStyle]);
      (res as any)[key] = value; // CSSProperties 的值类型太复杂了； todo optimize
    }
    return res;
  }

  if (Array.isArray(style)) {
    style.forEach((item) => {
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
    // console.log('toRaw(style) is ', toRaw(style))
    return getRawStyles(toRaw(style));
  } else {
    return convertRecordToIStyle(style as RawStyle);
  }
}

function parseStyleValue(style?: StyleValue, resStyle: RawStyle = {}) {
  if (isString(style)) {
    Object.assign(resStyle, parseStringStyle(style));
  } else if (isArray(style)) {
    style.forEach((item) => {
      parseStyleValue(item, resStyle);
    });
  } else if (isRef(style)) {
    Object.assign(resStyle, toRaw(style));
  } else {
    Object.assign(resStyle, style);
  }
  return resStyle;
}
