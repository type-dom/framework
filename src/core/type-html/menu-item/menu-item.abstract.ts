import { TypeHtml } from '../type-html.abstract';
import { ITypeMenuItem, TypeMenuItemProps } from './menu-item.interface';

export abstract class TypeMenuItem extends TypeHtml implements ITypeMenuItem {
  props: TypeMenuItemProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'menuitem'
    })
  }
}
