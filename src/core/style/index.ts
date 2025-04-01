// export type * from './css-rule/index';
import { IStyle } from '@type-dom/css-type';

export * from './style.enum';
export * from './create-style';
export function setStyles(el?: HTMLElement, styles?: IStyle) {
  if (!el || !styles) {
    return;
  }
  for (const key in styles) {
    if (Object.prototype.hasOwnProperty.call(styles, key)) {
      el.style.setProperty(key, styles[key as keyof IStyle] as string);
    }
  }
}
export function cssStrToObj(cssString: string): IStyle {
  const styleObject: IStyle = {};
  const styleRules = cssString.split(';');
  for (const rule of styleRules) {
    const [property, value] = rule.split(':').map(part => part.trim());
    if (property && value) {
      const camelCaseProperty = property.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
      (styleObject as any)[camelCaseProperty] = value;
    }
  }
  return styleObject;
}

// 示例用法
// const cssString = "color: red; font-size: 16px; background-color: yellow;";
// const styleObject = cssStringToObject(cssString);
// console.log(styleObject);
// // 输出: { color: 'red', fontSize: '16px', backgroundColor: 'yellow' }
