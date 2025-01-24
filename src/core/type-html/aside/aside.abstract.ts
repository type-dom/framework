import { TypeHtml } from '../type-html.abstract';
import { ITypeAside, ITypeAsideConfig } from './aside.interface';

export abstract class TypeAside extends TypeHtml implements ITypeAside {
  props: ITypeAsideConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'aside'
    })
  }
}
