import { TypeHtml } from '../type-html.abstract';
import type { ITypeVar, ITypeVarConfig } from './var.interface';

export abstract class TypeVar extends TypeHtml implements ITypeVar {
  props: ITypeVarConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'var'
    })
  }
}
