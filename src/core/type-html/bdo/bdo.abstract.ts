import { TypeHtml } from '../type-html.abstract';
import type { ITypeBdo, TypeBdoProps } from './bdo.interface';

export abstract class TypeBdo extends TypeHtml implements ITypeBdo {
  props: TypeBdoProps;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'bdo'
    })
  }
}
