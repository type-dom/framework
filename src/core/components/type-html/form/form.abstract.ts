import { defaultProps } from '../../../helpers/defaultProps';
import { TypeHtml } from '../type-html.abstract';
import { ITypeForm, FormProps } from './form.interface';

export abstract class TypeForm<Props extends FormProps = FormProps> extends TypeHtml<Props> implements ITypeForm {
  dom: HTMLFormElement;

  constructor(params: Props = {} as Props)  {
    super(defaultProps(params, {
      nodeName: 'form'
    } as Props));
    this.dom = document.createElement('form');
  }
}
