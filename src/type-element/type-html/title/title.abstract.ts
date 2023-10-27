import { TypeHtml } from '../type-html.abstract';
import { ITypeTitle } from './title.interface';
export abstract class TypeTitle extends TypeHtml implements ITypeTitle {
  nodeName: 'title';
  dom: HTMLTitleElement;
  protected constructor() {
    super();
    this.nodeName = 'title';
    this.dom = document.createElement(this.nodeName);
  }
}
