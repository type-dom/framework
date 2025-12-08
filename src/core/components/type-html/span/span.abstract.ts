import { TypeHtml } from '../type-html.abstract';
import { ITypeSpan, SpanProps } from './span.interface';

export abstract class TypeSpan<Props extends SpanProps = SpanProps> extends TypeHtml<Props> implements ITypeSpan {
  dom: HTMLSpanElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'span'
    } as Props);
    this.dom = document.createElement('span');
  }
}
