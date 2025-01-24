import { TypeHtml } from '../type-html.abstract';
import { ITypeSmall, ITypeSmallConfig } from './small.interface';

export abstract class TypeSmall extends TypeHtml implements ITypeSmall {
  props: ITypeSmallConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'small'
    })
  }
}
