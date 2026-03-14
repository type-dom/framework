import { TypeSelect } from '../../../../core/abstracts/type-html/select/select.abstract';
import { SelectProps } from '../../../../core/abstracts/type-html/select/select.interface';
import type { ISelect } from './select.interface';

export class Select extends TypeSelect implements ISelect {
  className: 'Select';
  value?: string | number | boolean;
  constructor(params: SelectProps = {}) {
    super(params);
    this.className = 'Select';
  }
}
