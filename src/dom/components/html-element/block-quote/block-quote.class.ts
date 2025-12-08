import { TypeBlockQuote } from '../../../../core/components/type-html/block-quote/block-quote.abstract';
import { BlockQuoteProps } from '../../../../core/components/type-html/block-quote/block-quote.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IBlockQuote } from './block-quote.interface';

export class BlockQuote extends TypeBlockQuote implements IBlockQuote {
  className: 'BlockQuote';

  override isBasic = true;

  constructor(params: BlockQuoteProps = {}) {
    super(params);
    this.className = 'BlockQuote';
    transformSlot(this, params.slot);
  }
}
