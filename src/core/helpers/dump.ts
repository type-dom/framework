import { camelToDash, encodeToXmlString } from '@type-dom/utils';
import { CSSProperties } from '../../dom/modules/style/style.interface';
import { NodeName } from '../enums';
import { TypeNode } from '../abstracts/type-node/type-node.abstract';

/**
 * 拼接出DOM字符串对应的数组。
 * buffer.join(''), 获得对应的字符串。
 * @param buffer
 * @param element
 */
export function dump(buffer: string[], element: TypeNode) {
  // console.log('type-node dump . ');
  if (element.props.nodeName === NodeName.TEXT) {
    buffer.push(encodeToXmlString(element.props.nodeValue));
    return;
  }
  buffer.push(`<${element.dom.nodeName}`);
  // 下面组装 属性 和 样式
  if (element.attrObj) {
    for (let key in element.attrObj as any) {
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
        ` ${key}="${encodeToXmlString(String((element.attrObj as any)[key]))}"`
      );
    }
  }
  if (element.styleObj) {
    let style = '';
    for (const key in element.styleObj) {
      style += `${camelToDash(key)}: ${encodeToXmlString(
        String(element.styleObj[key as keyof CSSProperties])
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
        // child.dump(buffer);
        dump(buffer, child);
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
