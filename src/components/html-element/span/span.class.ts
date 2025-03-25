import { TypeSpan } from '../../../core/type-html/span/span.abstract';
import type { TypeProps } from '../../../core/type-node/type-node.interface';
import type { ISpan } from './span.interface';

export class Span extends TypeSpan implements ISpan {
  className: 'Span';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Span';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
