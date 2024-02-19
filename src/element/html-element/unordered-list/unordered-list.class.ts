import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeUL } from '../../../type-element/type-html/ul/ul.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IUnorderedList } from './unordered-list.interface';
export class UnorderedList extends TypeUL implements IUnorderedList {
  className: 'UnorderedList';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'UnorderedList';
  }
}
