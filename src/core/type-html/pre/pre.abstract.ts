import { TypeHtml } from '../type-html.abstract';
import { ITypePre, ITypePreConfig } from './pre.interface';

export abstract class TypePre extends TypeHtml implements ITypePre {
  props: ITypePreConfig;
  dom?: HTMLPreElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'pre'
    })
  }
}
