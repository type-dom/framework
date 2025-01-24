import { TypeHtml } from '../type-html.abstract';
import { ITypeP, ITypePConfig } from './p.interface';

export abstract class TypeP extends TypeHtml implements ITypeP {
  props: ITypePConfig;
  dom?: HTMLParagraphElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'p'
    })
  }
}
