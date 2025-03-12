import { TypeHtml } from '../type-html.abstract';
import { ITypeRt, TypeRtProps } from './rt.interface';

export abstract class TypeRt extends TypeHtml implements ITypeRt {
  props: TypeRtProps
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'rt'
    })
  }
}
