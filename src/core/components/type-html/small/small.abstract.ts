import { TypeHtml } from '../type-html.abstract';
import { ITypeSmall, TypeSmallProps } from './small.interface';

export abstract class TypeSmall extends TypeHtml implements ITypeSmall {
  props: TypeSmallProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'small'
    })
  }
}
