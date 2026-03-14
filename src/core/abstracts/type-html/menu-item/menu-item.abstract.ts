import { TypeHtml } from '../type-html.abstract';
import { ITypeMenuItem, MenuItemProps } from './menu-item.interface';

export abstract class TypeMenuItem<Props extends MenuItemProps = MenuItemProps> extends TypeHtml<Props> implements ITypeMenuItem {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('menuitem');
  }
}
