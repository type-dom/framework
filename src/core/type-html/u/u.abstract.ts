import { TypeHtml } from '../type-html.abstract';
import { ITypeU, TypeUProps } from './u.interface';

export abstract class TypeU extends TypeHtml implements ITypeU {
  props: TypeUProps;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'u'
    })
  }
}
