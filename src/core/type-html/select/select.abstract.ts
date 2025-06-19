import { TypeHtml } from '../type-html.abstract';
import { ITypeSelect, TypeSelectProps } from './select.interface';

export abstract class TypeSelect extends TypeHtml implements ITypeSelect {
  props: TypeSelectProps;
  dom?: HTMLSelectElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'select'
    })
  }
}
