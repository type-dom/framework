import { TypeForm } from '../../type-html/form/form.abstract';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import type { IForm } from './form.interface';

export class Form extends TypeForm implements IForm {
  className: 'Form';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Form';
    this.setProps(params);
  }
}
