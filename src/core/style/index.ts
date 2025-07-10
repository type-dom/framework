
import { CSSProperties } from './style.interface';
export type * from './style.interface';
export * from './style.enum';
export * from './create-style';
export function setStyles(el?: HTMLElement, styles?: CSSProperties) {
  if (!el || !styles) {
    return;
  }
  for (const key in styles) {
    if (Object.prototype.hasOwnProperty.call(styles, key)) {
      el.style.setProperty(key, styles[key as keyof CSSProperties] as string);
    }
  }
}

// 示例用法
// const cssString = "color: red; font-size: 16px; background-color: yellow;";
// const styleObject = cssStringToObject(cssString);
// console.log(styleObject);
// // 输出: { color: 'red', fontSize: '16px', backgroundColor: 'yellow' }
