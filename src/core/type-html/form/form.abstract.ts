import { TypeHtml } from '../type-html.abstract';
import { ITypeForm, ITypeFormConfig } from './form.interface';

export abstract class TypeForm extends TypeHtml implements ITypeForm {
  props: ITypeFormConfig;
  dom?: HTMLFormElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'form'
    })
  }
}
