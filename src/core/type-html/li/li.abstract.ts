import { TypeHtml } from '../type-html.abstract';
import { ITypeLI, TypeLIProps } from './li.interface';

/**
 * 列表项 list item
 */
export abstract class TypeLI extends TypeHtml implements ITypeLI {
  props: TypeLIProps;
  dom?: HTMLLIElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'li'
    })
  }
}
