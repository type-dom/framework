import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeData } from '../../../type-element/type-html/data/data.abstract';
import type { IData } from './data.interface';

export class Data extends TypeData implements IData {
  className: 'Data';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Data';
  }
}
