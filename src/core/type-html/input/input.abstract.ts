import { TypeHtml } from '../type-html.abstract';
import { ITypeInput, TypeInputProps } from './input.interface';

export abstract class TypeInput extends TypeHtml implements ITypeInput {
  props: TypeInputProps;
  dom?: HTMLInputElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'input'
    })
  }
}
