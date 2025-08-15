import { TypeHtml } from '../type-html.abstract';
import { ITypeS, TypeSProps } from './s.interface';

export abstract class TypeS extends TypeHtml implements ITypeS {
  props: TypeSProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 's'
    })
  }
}
