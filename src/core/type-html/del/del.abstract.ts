import { TypeHtml } from '../type-html.abstract';
import { ITypeDel, ITypeDelConfig } from './del.interface';

export abstract class TypeDel extends TypeHtml implements ITypeDel {
  props: ITypeDelConfig;
  dom?: HTMLModElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'del'
    })
  }
}
