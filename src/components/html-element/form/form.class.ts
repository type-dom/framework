import { TypeForm } from '../../../core/type-html/form/form.abstract';
import type { TypeProps } from '../../../core/type-node/type-node.interface';
import type { IForm } from './form.interface';

export class Form extends TypeForm implements IForm {
  className: 'Form';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Form';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
