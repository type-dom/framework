import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeBlockQuote } from '../../../core/type-html/block-quote/block-quote.abstract';
import type { IBlockQuote } from './block-quote.interface';

export class BlockQuote extends TypeBlockQuote implements IBlockQuote {
  className: 'BlockQuote';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'BlockQuote';
    this.useParams(params);
  }
}
