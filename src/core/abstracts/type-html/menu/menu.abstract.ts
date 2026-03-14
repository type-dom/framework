import { TypeHtml } from '../type-html.abstract';
import { ITypeMenu, MenuProps } from './menu.interface';

export abstract class TypeMenu<Props extends MenuProps = MenuProps> extends TypeHtml<Props> implements ITypeMenu {
  dom: HTMLMenuElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('menu');
  }
}
