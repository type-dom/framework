import { ITypeConfig } from '../../../config.interface';
import { TypeSelect } from '../../../type-element/type-html/select/select.abstract';
import { Option } from '../option/option.class';
import type { ISelect } from './select.interface';

export class Select extends TypeSelect implements ISelect {
  className: 'Select';
  override childNodes: Option[];
  value?: string | number | boolean;

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Select';
    this.childNodes = [];
    this.setConfig(config);
  }
}
