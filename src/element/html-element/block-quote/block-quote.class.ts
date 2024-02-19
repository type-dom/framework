import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeBlockQuote } from '../../../type-element/type-html/block-quote/block-quote.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IBlockQuote } from './block-quote.interface';
export class BlockQuote extends TypeBlockQuote implements IBlockQuote {
  className: 'BlockQuote';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'BlockQuote';
  }
}
