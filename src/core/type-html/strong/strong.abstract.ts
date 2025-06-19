import { TypeHtml } from '../type-html.abstract';
import { ITypeStrong, TypeStrongProps } from './strong.interface';

export abstract class TypeStrong extends TypeHtml implements ITypeStrong {
  props: TypeStrongProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'strong'
    })
  }
}
