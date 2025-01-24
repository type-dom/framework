import { TypeHtml } from '../type-html.abstract';
import { ITypeEm, ITypeEmConfig } from './em.interface';

export abstract class TypeEm extends TypeHtml implements ITypeEm {
  props: ITypeEmConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'em'
    })
  }
}
