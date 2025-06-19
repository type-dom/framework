import { TypeHtml } from '../type-html.abstract';
import { ITypeBase, TypeBaseProps } from './base.interface';

export abstract class TypeBase extends TypeHtml implements ITypeBase {
  props: TypeBaseProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'base'
    });
  }
}
