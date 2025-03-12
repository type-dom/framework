import { TypeHtml } from '../type-html.abstract';
import { ITypeDel, TypeDelProps } from './del.interface';

export abstract class TypeDel extends TypeHtml implements ITypeDel {
  props: TypeDelProps;
  dom?: HTMLModElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'del'
    })
  }
}
