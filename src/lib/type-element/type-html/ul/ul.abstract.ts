import { TypeHtml } from '../type-html.abstract';
import { TypeLI } from '../li/li.abstract';
import type { ITypeUL } from './ul.interface';

export abstract class TypeUL extends TypeHtml implements ITypeUL {
  nodeName: 'ul';
  dom: HTMLUListElement;
  declare childNodes: TypeLI[];

  protected constructor() {
    super();
    this.nodeName = 'ul';
    this.addStyleObj({
      margin: '0',
      padding: '0'
    });
    this.dom = document.createElement(this.nodeName);
    this.childNodes = [];
  }
}
