import { TypeHtml } from '../type-html.abstract';
import { ITypeI, TypeIProps } from './i.interface';

export abstract class TypeI extends TypeHtml implements ITypeI {
  props: TypeIProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'i'
    })
  }
}
