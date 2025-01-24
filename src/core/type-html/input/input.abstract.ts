import { TypeHtml } from '../type-html.abstract';
import { ITypeInput, ITypeInputConfig } from './input.interface';

export abstract class TypeInput extends TypeHtml implements ITypeInput {
  props: ITypeInputConfig;
  dom?: HTMLInputElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'input'
    })
  }
}
