import { TypeBlockQuote } from '../../../../core/abstracts/type-html/block-quote/block-quote.abstract';
import { BlockQuoteProps } from '../../../../core/abstracts/type-html/block-quote/block-quote.interface';
import type { IBlockQuote } from './block-quote.interface';

export class BlockQuote extends TypeBlockQuote implements IBlockQuote {
  className: 'BlockQuote';

  constructor(params: BlockQuoteProps = {}) {
    super(params);
    this.className = 'BlockQuote';
  }
}
