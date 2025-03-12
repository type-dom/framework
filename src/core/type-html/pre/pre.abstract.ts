import { TypeHtml } from '../type-html.abstract';
import { ITypePre, TypePreProps } from './pre.interface';

export abstract class TypePre extends TypeHtml implements ITypePre {
  props: TypePreProps;
  dom?: HTMLPreElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'pre'
    })
  }
}
