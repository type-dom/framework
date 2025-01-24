import { TypeHtml } from '../type-html.abstract';
import { ITypeQ, ITypeQConfig } from './q.interface';

export abstract class TypeQ extends TypeHtml implements ITypeQ {
  props: ITypeQConfig;
  dom?: HTMLQuoteElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'q'
    });
  }
}
