import { TypeHtml } from '../type-html.abstract';
import { ITypeWbr, ITypeWbrConfig } from './wbr.interface';

export abstract class TypeWbr extends TypeHtml implements ITypeWbr {
  props: ITypeWbrConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'wbr'
    });
  }
}
