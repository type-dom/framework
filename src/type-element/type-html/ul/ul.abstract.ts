import { TypeHtml } from '../type-html.abstract';
import { ITypeUL } from './ul.interface';
import { TypeLI } from './li/li.abstract';
export abstract class TypeUL extends TypeHtml implements ITypeUL {
  nodeName: 'ul';
  dom: HTMLUListElement;
  childNodes: TypeLI[];
  protected constructor() {
    super('ul');
    this.nodeName = 'ul';
    this.addStyleObj({
      marginBlockStart: '0',
      marginBlockEnd: '0',
      paddingInlineStart: '0',
    })
    this.dom = document.createElement(this.nodeName);
    this.childNodes = [];
  }
}
