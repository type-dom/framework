/**
 * @file create.ts
 * @description 主要是style属性不能添加伪元素和伪类，所以需要使用js动态创建样式。
 * @param cssStyles
 * @returns styleElement
 * @author xjf
 * @create 2024-06-08
 * @update
 * @version 1.0.0
 * @license MIT
 * @copyright 2024-06-08
 * @example
 * 定义要添加的CSS样式字符串
 *   const cssStyles = `
 *      .myClass { // 样式类要加哈希值，局域化处理
 *        color: red;
 *        font-size: 20px;
 *      }
 *      添加更多样式规则...
 *   `;
 * @param cssStyles
 */
import { IStyle } from '@type-dom/css-type';
import { currentInstance, vHash } from '../index';
import { camelToDash } from '@type-dom/utils';

const styleElement = createStyleElement();

function createStyleElement() {
  // 创建一个新的<style>元素
  const styleElement = document.createElement('style');

// 设置<style>元素的type属性为"text/css"
  styleElement.type = 'text/css';

  styleElement.className = 'td-ui-' + vHash;

// 将创建好的<style>标签添加到<head>中，使其生效
  document.head.appendChild(styleElement);
  // sheet.insertRule('body { background-color: blue; }', 0); // 参数1是CSS规则，参数2是插入的位置索引
  // if (!styleElement.sheet?.insertRule) {
  //   console.error('styleSheet.insertRule is not a function');
  // }
  return styleElement;
}

export function createStyle(cssStyles: string) {
  // console.log('createStyle . cssStyles is ', cssStyles);
  // styleSheet?.insertRule('body { background-color: blue; }', styleSheet.cssRules.length)
  // styleSheet?.insertRule(cssStyles, styleSheet.cssRules.length);

// Internet Explorer支持通过styleSheet对象和addRule方法添加样式
  if ((styleElement as any)?.styleSheet) {
    (styleElement as any).styleSheet.cssText = cssStyles;
  } else {
    // 其他现代浏览器支持通过textContent或innerHTML属性添加样式文本
    styleElement.appendChild(document.createTextNode(cssStyles));
  }
}

// 有作用域的样式 data-v- *****
export function createClass(className: string, styleObj: IStyle & Record<string, string | number>) {
  // console.log('createClass . className: ', className, ' styleObj: ', styleObj);
  const clsArr = className.split(' ');
  let selector = '';
  clsArr.forEach(className => {
    if (className.includes(':')) { // 有伪类时 :hover :focus
      const [name, pseudoClass] = className.split(':');
      // console.log('pseudoClass is ', pseudoClass);
      selector = `.${name}[data-v-${vHash}]:${pseudoClass}`;
    } else {
      selector += `.${className}[data-v-${vHash}] `;
    }
  })

  const cssText = buildCssRule(selector, styleObj);
  createStyle(cssText);
}

function buildCssRule(selector: string, style: IStyle) {
  // let selector = jsonRule.selector;
  const styleParts = [];
  for (const prop in style) {
    if (Object.prototype.hasOwnProperty.call(style, prop)) {
      styleParts.push(`${camelToDash(prop)}: ${style[prop as keyof IStyle]};`);
    }
  }
  return `${selector} { ${styleParts.join(' ')} }`;
}

// let cssRuleString = jsonToCssRule(cssRuleJson);
// cssRuleString 现在是 ".myClass { color: blue; font-size: 16px; }"
