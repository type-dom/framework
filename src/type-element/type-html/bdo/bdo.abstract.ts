import { TypeHtml } from '../type-html.abstract';
import { ITypeBdo } from './bdo.interface';
export abstract class TypeBdo extends TypeHtml implements ITypeBdo {
  nodeName: 'bdo';
  dom: HTMLElement;
  protected constructor() {
    super();
    this.nodeName = 'bdo';
    this.dom = document.createElement(this.nodeName);
  }
}
