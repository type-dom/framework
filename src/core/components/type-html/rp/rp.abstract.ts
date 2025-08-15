import { TypeHtml } from '../type-html.abstract';
import { ITypeRp, TypeRpProps } from './rp.interface';

export abstract class TypeRp extends TypeHtml implements ITypeRp {
  props: TypeRpProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'rp'
    })
  }
}
