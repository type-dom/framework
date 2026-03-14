import { TypeSpan } from '../../../../core/abstracts/type-html/span/span.abstract';
import { SpanProps } from '../../../../core/abstracts/type-html/span/span.interface';
import type { ISpan } from './span.interface';

export class Span extends TypeSpan implements ISpan {
  className: 'Span';
  constructor(params: SpanProps = {}) {
    super(params);
    this.className = 'Span';
  }
}
