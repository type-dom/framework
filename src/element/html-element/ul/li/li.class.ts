import { TypeHtml } from '../../../../type-element/type-html/type-html.abstract';
import { TextNode } from '../../../../text-node/text-node.class';
import { ITypeConfig } from '../../../../config.interface';
import type { ILI } from './li.interface';

export class LI extends TypeHtml implements ILI {
  nodeName: 'li';
  className: 'LI';
  dom: HTMLLIElement;
  declare childNodes: (TypeHtml | TextNode)[];

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.nodeName = 'li';
    this.dom = document.createElement(this.nodeName);
    this.className = 'LI';
    this.childNodes = [];
    this.propObj = {
      styleObj: {
        width: '100px',
        textAlign: 'center',
        padding: '6px 14px',
        borderRadius: '4px 4px 0px 0px',
        borderBottom: 'none',
        boxSizing: 'border-box'
      },
      attrObj: {
        name: 'list-item'
      }
    };
  }
}
