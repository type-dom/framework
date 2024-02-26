import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeData } from '../../../type-element/type-html/data/data.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IData } from './data.interface';
export class Data extends TypeData implements IData {
  className: 'Data';
  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Data';
  }
}
