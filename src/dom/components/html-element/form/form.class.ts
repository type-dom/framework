import { TypeForm } from '../../../../core/components/type-html/form/form.abstract';
import { TypeFormProps } from '../../../../core/components/type-html/form/form.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IForm } from './form.interface';

export class Form extends TypeForm implements IForm {
  className: 'Form';

  override isBasic = true;

  constructor(params: TypeFormProps = {}) {
    super();
    this.className = 'Form';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
