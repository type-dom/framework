import { TypeHtml } from '../type-html.abstract';
import { ITypeCode, TypeCodeProps } from './code.interface';

export abstract class TypeCode extends TypeHtml implements ITypeCode {
  props: TypeCodeProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'code'
    })
  }
}
