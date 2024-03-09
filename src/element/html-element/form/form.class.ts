import { TypeForm } from '../../../type-element/type-html/form/form.abstract';
import { ITypeConfig } from '../../../config.interface';
import type { IForm } from './form.interface';

export class Form extends TypeForm implements IForm {
  className: 'Form';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Form';
    this.setConfig(config);
  }
}
