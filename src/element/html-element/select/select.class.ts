import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeSelect } from '../../../type-element/type-html/select/select.abstract';
import { Option } from '../option/option.class';
import type { ISelect } from './select.interface';

export class Select extends TypeSelect implements ISelect {
  className: 'Select';
  declare childNodes: Option[];
  value?: string | number | boolean;

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Select';
    this.childNodes = [];
  }
}
