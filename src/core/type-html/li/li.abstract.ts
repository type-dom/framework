import { TypeHtml } from '../type-html.abstract';
import { ITypeLI, ITypeLIConfig } from './li.interface';

/**
 * 列表项 list item
 */
export abstract class TypeLI extends TypeHtml implements ITypeLI {
  props: ITypeLIConfig;
  dom?: HTMLLIElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'li'
    })
  }
}
