import { TypeHtml } from '../type-html.abstract';
import { ITypeBlockQuote, BlockQuoteProps } from './block-quote.interface';

export abstract class TypeBlockQuote<Props extends BlockQuoteProps = BlockQuoteProps> extends TypeHtml<Props> implements ITypeBlockQuote {
  dom: HTMLQuoteElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('blockquote');
  }
}
