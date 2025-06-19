import { TypeHtml } from '../type-html.abstract';
import { ITypeP, TypePProps } from './p.interface';

export abstract class TypeP extends TypeHtml implements ITypeP {
  props: TypePProps;
  dom?: HTMLParagraphElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'p'
    })
  }
}
