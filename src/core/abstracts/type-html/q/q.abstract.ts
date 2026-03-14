import { TypeHtml } from '../type-html.abstract';
import { ITypeQ, QProps } from './q.interface';

export abstract class TypeQ<Props extends QProps = QProps> extends TypeHtml<Props> implements ITypeQ {
  dom: HTMLQuoteElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('q');
  }
}
