import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeBlockQuote } from '../../../type-element/type-html/block-quote/block-quote.abstract';
import type { IBlockQuote } from './block-quote.interface';

export class BlockQuote extends TypeBlockQuote implements IBlockQuote {
  className: 'BlockQuote';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'BlockQuote';
    this.setConfig(config);
  }
}
