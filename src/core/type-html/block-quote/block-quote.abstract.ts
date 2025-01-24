import { TypeHtml } from '../type-html.abstract';
import { ITypeBlockQuote, ITypeBlockQuoteConfig } from './block-quote.interface';

export abstract class TypeBlockQuote extends TypeHtml implements ITypeBlockQuote {
  props: ITypeBlockQuoteConfig;
  dom?: HTMLQuoteElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'blockquote'
    })
  }
}
