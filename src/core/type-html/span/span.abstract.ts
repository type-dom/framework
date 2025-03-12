import { TypeHtml } from '../type-html.abstract';
import { ITypeSpan, TypeSpanProps } from './span.interface';

export abstract class TypeSpan extends TypeHtml implements ITypeSpan {
  props: TypeSpanProps;
  dom?: HTMLSpanElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'span'
    })
  }
}
