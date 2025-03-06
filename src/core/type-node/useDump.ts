import { camelToDash, encodeToXmlString } from '@type-dom/utils';
import { IStyle } from '@type-dom/css-type';
import { TypeNode } from './type-node.abstract';
import { NodeName } from '../enums';

export function useDump(buffer: string[], element: TypeNode) {
  // console.log('type-node dump . ');
  if (element.props.nodeName === NodeName.TEXT) {
    buffer.push(encodeToXmlString(element.props.nodeValue));
    return;
  }
  buffer.push(`<${element.props.nodeName}`);
  // 下面组装 属性 和 样式
  if (element.attr?.getObj()) {
    for (let key in element.attr?.getObj()) {
      // 下面几个属性不需要转
      if (
        key !== 'viewBox' &&
        key !== 'spreadMethod' &&
        key !== 'gradientUnits'
      ) {
        key = camelToDash(key);
      }
      // todo
      buffer.push(
        ` ${key}="${encodeToXmlString(String(element.attr?.get(key)))}"`
      );
    }
  }
  if (element.style?.getObj()) {
    let style = '';
    for (const key in element.style?.getObj()) {
      style += `${camelToDash(key)}: ${encodeToXmlString(
        String(element.style?.get(key as keyof IStyle))
      )};`;
    }
    if (style !== '') {
      buffer.push(` style="${style}"`);
    }
  }
  // todo element.attributes may be repeated with element.attr.obj
  if (element.attributes) {
    for (const attribute of element.attributes) {
      buffer.push(
        ` ${attribute.name}="${encodeToXmlString(
          attribute.value?.toString()
        )}"`
      );
    }
  }
  if (element.hasChildNodes()) {
    buffer.push('>');
    if (element.childNodes) {
      for (const child of element.childNodes) {
        child.dump(buffer);
      }
    }
    buffer.push(`</${element.props.nodeName}>`);
  } else if (element.props.nodeValue !== undefined) {
    buffer.push(
      `>${encodeToXmlString(element.props.nodeValue.toString())}</${element.props.nodeName}>`
    );
  } else {
    buffer.push('/>');
  }
}
