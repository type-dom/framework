import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeBlockQuote } from '../../../core/type-html/block-quote/block-quote.abstract';
import type { IBlockQuote } from './block-quote.interface';

export class BlockQuote extends TypeBlockQuote implements IBlockQuote {
  className: 'BlockQuote';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'BlockQuote';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
