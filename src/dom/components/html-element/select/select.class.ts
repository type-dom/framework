import { TypeSelect } from '../../../../core/components/type-html/select/select.abstract';
import { SelectProps } from '../../../../core/components/type-html/select/select.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ISelect } from './select.interface';

export class Select extends TypeSelect implements ISelect {
  className: 'Select';
  value?: string | number | boolean;

  override isBasic = true;

  constructor(params: SelectProps = {}) {
    super(params);
    this.className = 'Select';
    transformSlot(this, params.slot);
  }
}
