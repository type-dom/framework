import { TypeHtml } from '../type-html.abstract';
import { ITypeOption, TypeOptionProps } from './option.interface';

export abstract class TypeOption extends TypeHtml implements ITypeOption {
  props: TypeOptionProps;
  dom?: HTMLOptionElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'option'
    })
  }
}
