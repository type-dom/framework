import { TypeSpan } from '../../../core/type-html/span/span.abstract';
import { TypeSpanProps } from '../../../core/type-html/span/span.interface';
import type { ISpan } from './span.interface';

export class Span extends TypeSpan implements ISpan {
  className: 'Span';

  override isBasic = true;

  constructor(params: TypeSpanProps = {}) {
    super();
    this.className = 'Span';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
