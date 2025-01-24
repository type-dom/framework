import { TypeHtml } from '../type-html.abstract';
import { ITypeSelect, ITypeSelectConfig } from './select.interface';

export abstract class TypeSelect extends TypeHtml implements ITypeSelect {
  props: ITypeSelectConfig;
  dom?: HTMLSelectElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'select'
    })
  }
}
