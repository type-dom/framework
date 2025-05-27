import { IStyle } from '@type-dom/css-type';

export function cssStrToObj(cssString: string): IStyle {
  const styleObject: IStyle = {};
  const styleRules = cssString.split(';');
  for (const rule of styleRules) {
    const [property, value] = rule.split(':').map(part => part.trim());
    if (property && value) {
      const camelCaseProperty = property.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
      (styleObject as any)[camelCaseProperty] = value;
    }
  }
  return styleObject;
}
