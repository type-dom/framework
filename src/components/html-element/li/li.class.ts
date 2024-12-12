import { TypeElement } from '../../../core/type-element/type-element.abstract';
import { TypeLI } from '../../../core/type-html/li/li.abstract';
import { TextNode } from '../../../core/text-node/text-node.class';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import type { ILI } from './li.interface';

export class LI extends TypeLI implements ILI {
  className: 'LI';
  override childNodes: (TypeElement | TextNode)[];

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'LI';
    this.childNodes = [];
    this.style.addObj({
      // todo: 应该在具体组件中配置样式
      width: '100px',
      textAlign: 'center',
      padding: '6px 14px',
      borderRadius: '4px 4px 0px 0px',
      borderBottom: 'none',
      boxSizing: 'border-box'
    });
    this.attr.addName('list-item');

    this.useParams(params);
  }
}
