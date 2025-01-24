import { TypeHtml } from '../type-html.abstract';
import { ITypeS, ITypeSConfig } from './s.interface';

export abstract class TypeS extends TypeHtml implements ITypeS {
  props: ITypeSConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 's'
    })
  }
}
