import { TypeHtml } from '../type-html.abstract';
import type { ITypeVar, TypeVarProps } from './var.interface';

export abstract class TypeVar extends TypeHtml implements ITypeVar {
  props: TypeVarProps;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'var'
    })
  }
}
