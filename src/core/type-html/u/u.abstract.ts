import { TypeHtml } from '../type-html.abstract';
import { ITypeU, ITypeUConfig } from './u.interface';

export abstract class TypeU extends TypeHtml implements ITypeU {
  props: ITypeUConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'u'
    })
  }
}
