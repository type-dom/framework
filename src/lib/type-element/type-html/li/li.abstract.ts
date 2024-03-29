import { TypeHtml } from '../type-html.abstract';
import type { ITypeLI } from './li.interface';

/**
 * 列表项 list item
 */
export abstract class TypeLI extends TypeHtml implements ITypeLI {
  nodeName: 'li';
  dom: HTMLLIElement;

  protected constructor() {
    super();
    this.nodeName = 'li';
    this.dom = document.createElement(this.nodeName);
  }
}
