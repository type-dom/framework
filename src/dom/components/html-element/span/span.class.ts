import { TypeSpan } from '../../../../core/components/type-html/span/span.abstract';
import { SpanProps } from '../../../../core/components/type-html/span/span.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ISpan } from './span.interface';

export class Span extends TypeSpan implements ISpan {
  className: 'Span';

  override isBasic = true;

  constructor(params: SpanProps = {}) {
    super(params);
    this.className = 'Span';
    transformSlot(this, params.slot);
  }
}
