import { TypeHtml } from '../type-html.abstract';
import { ITypeEm, TypeEmProps } from './em.interface';

export abstract class TypeEm extends TypeHtml implements ITypeEm {
  props: TypeEmProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'em'
    })
  }
}
