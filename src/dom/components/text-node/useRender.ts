import { isMustache } from '@type-dom/utils';
import { mustacheNode } from '../../../util';
import { TextNode } from './text-node.class';

export function useTextRender(element: TextNode) {
  // console.log('TextNode render is ', element.nodeValue);
  // 渲染出来的值，在 模板语法中需要转换的。
  let text = element.props.nodeValue?.toString() ?? '';
  if (isMustache(text)) {
    // if (element.nodeValue === '基础用法 {{ title }}') {
    //   console.log('element is ', element);
    // }
    // todo 监听 itemData change
    // if (element.itemData) {
    //   text = mustache(element.nodeValue, element.itemData);
    // }
    const context = element.getContext();
    if (context) {
      text = mustacheNode(text, context);
    }
  }
  if (element.dom === undefined) {
    element.dom = document.createTextNode(text.toString());
  } else {
    element.dom.textContent = text ?? ''; // '\u200b'; // &zwnj; \u200c &zwsp;
  }
  element.isRendered = true;
}
