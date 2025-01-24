import { TypeHtml } from '../type-html.abstract';
import { ITypeCode, ITypeCodeConfig } from './code.interface';

export abstract class TypeCode extends TypeHtml implements ITypeCode {
  props: ITypeCodeConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'code'
    })
  }
}
