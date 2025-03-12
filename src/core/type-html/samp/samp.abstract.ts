import { TypeHtml } from '../type-html.abstract';
import { ITypeSamp, TypeSampProps } from './samp.interface';

export abstract class TypeSamp extends TypeHtml implements ITypeSamp {
  props: TypeSampProps;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'samp'
    })
  }
}
