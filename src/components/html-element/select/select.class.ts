import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeSelect } from '../../type-html/select/select.abstract';
import { Option } from '../option/option.class';
import type { ISelect } from './select.interface';

export class Select extends TypeSelect implements ISelect {
  className: 'Select';
  override childNodes: Option[];
  value?: string | number | boolean;

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Select';
    this.childNodes = [];
    this.setProps(params);
  }
}
