import { TypeHtml } from '../type-html.abstract';
import { ITypeMenuItem, ITypeMenuItemConfig } from './menu-item.interface';

export abstract class TypeMenuItem extends TypeHtml implements ITypeMenuItem {
  props: ITypeMenuItemConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'menuitem'
    })
  }
}
