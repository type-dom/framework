import { TypeHtml } from '../type-html.abstract';
import { ITypeSpan, ITypeSpanConfig } from './span.interface';

export abstract class TypeSpan extends TypeHtml implements ITypeSpan {
  props: ITypeSpanConfig;
  dom?: HTMLSpanElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'span'
    })
  }
}
