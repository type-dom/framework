import { TypeHtml } from '../type-html.abstract';
import { ITypeStrong, ITypeStrongConfig } from './strong.interface';

export abstract class TypeStrong extends TypeHtml implements ITypeStrong {
  props: ITypeStrongConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'strong'
    })
  }
}
