import { TypeHtml } from '../type-html.abstract';
import { ITypeMenu, TypeMenuProps } from './menu.interface';

export abstract class TypeMenu extends TypeHtml implements ITypeMenu {
  props: TypeMenuProps;
  dom?: HTMLMenuElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'menu'
    })
  }
}
