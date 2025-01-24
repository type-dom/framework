import { TypeHtml } from '../type-html.abstract';
import type { ITypeBdo, ITypeBdoConfig } from './bdo.interface';

export abstract class TypeBdo extends TypeHtml implements ITypeBdo {
  props: ITypeBdoConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'bdo'
    })
  }
}
