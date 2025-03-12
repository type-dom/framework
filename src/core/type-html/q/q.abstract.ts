import { TypeHtml } from '../type-html.abstract';
import { ITypeQ, TypeQProps } from './q.interface';

export abstract class TypeQ extends TypeHtml implements ITypeQ {
  props: TypeQProps;
  dom?: HTMLQuoteElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'q'
    });
  }
}
