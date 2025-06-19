import { TypeHtml } from '../type-html.abstract';
import { ITypeCite, TypeCiteProps } from './cite.interface';

export abstract class TypeCite extends TypeHtml implements ITypeCite {
  props: TypeCiteProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'cite'
    })
  }
}
