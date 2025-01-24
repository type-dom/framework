import { TypeHtml } from '../type-html.abstract';
import { ITypeRp, ITypeRpConfig } from './rp.interface';

export abstract class TypeRp extends TypeHtml implements ITypeRp {
  props: ITypeRpConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'rp'
    })
  }
}
