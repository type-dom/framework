import { TypeHtml } from '../type-html.abstract';
import { ITypeWbr, TypeWbrProps } from './wbr.interface';

export abstract class TypeWbr extends TypeHtml implements ITypeWbr {
  props: TypeWbrProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'wbr'
    });
  }
}
