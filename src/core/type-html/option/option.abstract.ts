import { TypeHtml } from '../type-html.abstract';
import { ITypeOption, ITypeOptionConfig } from './option.interface';

export abstract class TypeOption extends TypeHtml implements ITypeOption {
  props: ITypeOptionConfig;
  dom?: HTMLOptionElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'option'
    })
  }
}
