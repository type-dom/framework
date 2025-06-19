import { TypeHtml } from '../type-html.abstract';
import { ITypeBr, TypeBrProps } from './br.interface';

export abstract class TypeBr extends TypeHtml implements ITypeBr {
  props: TypeBrProps;
  dom?: HTMLBRElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'br'
    })
  }
}
