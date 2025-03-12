import { TypeHtml } from '../type-html.abstract';
import { ITypeForm, TypeFormProps } from './form.interface';

export abstract class TypeForm extends TypeHtml implements ITypeForm {
  props: TypeFormProps;
  dom?: HTMLFormElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'form'
    })
  }
}
