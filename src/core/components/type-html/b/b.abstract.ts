import { TypeHtml } from '../type-html.abstract';
import { ITypeB, TypeBProps } from './b.interface';

export abstract class TypeB extends TypeHtml implements ITypeB {
  props: TypeBProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'b',
    })
  }
}
