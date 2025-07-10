import { CSSProperties } from './style.interface';
/**
 * 将CSS字符串转换为CSSProperties对象
 * @param cssString 格式为"property:value;"的CSS样式字符串
 * @returns 包含驼峰命名属性的CSSProperties对象
 */
export function cssStrToObj(cssString: string): CSSProperties {
  const styleObject: CSSProperties = {};
  // 解析CSS字符串为样式规则数组
  const styleRules = cssString.split(';');

  // 遍历处理每个样式规则
  for (const rule of styleRules) {
    // 分割属性和值并去除空格
    const [property, value] = rule.split(':').map(part => part.trim());

    if (property && value) {
      // 转换连字符属性名为驼峰命名（如background-color -> backgroundColor）
      const camelCaseProperty = property.replace(/-([a-z])/g, (_match, letter) => letter.toUpperCase());
      (styleObject as any)[camelCaseProperty] = value;
    }
  }

  return styleObject;
}
