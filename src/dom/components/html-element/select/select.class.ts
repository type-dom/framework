import { TypeSelect } from '../../../../core/components/type-html/select/select.abstract';
import { TypeSelectProps } from '../../../../core/components/type-html/select/select.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ISelect } from './select.interface';

export class Select extends TypeSelect implements ISelect {
  className: 'Select';
  value?: string | number | boolean;

  override isBasic = true;

  constructor(params: TypeSelectProps = {}) {
    super();
    this.className = 'Select';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
