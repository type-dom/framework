import { TypeHtml } from '../type-html.abstract';
import { ITypeMenu, ITypeMenuConfig } from './menu.interface';

export abstract class TypeMenu extends TypeHtml implements ITypeMenu {
  props: ITypeMenuConfig;
  dom?: HTMLMenuElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'menu'
    })
  }
}
