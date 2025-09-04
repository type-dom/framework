import { TypeSpan } from '../../../../core/components/type-html/span/span.abstract';
import { TypeSpanProps } from '../../../../core/components/type-html/span/span.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ISpan } from './span.interface';

export class Span extends TypeSpan implements ISpan {
  className: 'Span';

  override isBasic = true;

  constructor(params: TypeSpanProps = {}) {
    super();
    this.className = 'Span';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
