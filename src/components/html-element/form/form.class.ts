import { TypeForm } from '../../../core/type-html/form/form.abstract';
import { TypeFormProps } from '../../../core/type-html/form/form.interface';
import type { IForm } from './form.interface';

export class Form extends TypeForm implements IForm {
  className: 'Form';

  override isBasic = true;

  constructor(params: TypeFormProps = {}) {
    super();
    this.className = 'Form';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
