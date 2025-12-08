import { TypeHtml } from '../type-html.abstract';
import { ITypeMenu, MenuProps } from './menu.interface';

export abstract class TypeMenu<Props extends MenuProps = MenuProps> extends TypeHtml<Props> implements ITypeMenu {
  dom: HTMLMenuElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'menu'
    } as Props);
    this.dom = document.createElement('menu');
  }
}
