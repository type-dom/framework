import { TypeBlockQuote } from '../../../core/type-html/block-quote/block-quote.abstract';
import { TypeBlockQuoteProps } from '../../../core/type-html/block-quote/block-quote.interface';
import type { IBlockQuote } from './block-quote.interface';

export class BlockQuote extends TypeBlockQuote implements IBlockQuote {
  className: 'BlockQuote';

  override isBasic = true;

  constructor(params: TypeBlockQuoteProps = {}) {
    super();
    this.className = 'BlockQuote';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
