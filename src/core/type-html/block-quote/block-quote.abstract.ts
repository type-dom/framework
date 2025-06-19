import { TypeHtml } from '../type-html.abstract';
import { ITypeBlockQuote, TypeBlockQuoteProps } from './block-quote.interface';

export abstract class TypeBlockQuote extends TypeHtml implements ITypeBlockQuote {
  props: TypeBlockQuoteProps;
  dom?: HTMLQuoteElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'blockquote'
    })
  }
}
