import { TypeHtml } from '../type-html.abstract';
import { ITypeCite, ITypeCiteConfig } from './cite.interface';

export abstract class TypeCite extends TypeHtml implements ITypeCite {
  props: ITypeCiteConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'cite'
    })
  }
}
