import { TypeHtml } from '../type-html.abstract';
import { ITypeDetails } from './details.interface';
export abstract class TypeDetails extends TypeHtml implements ITypeDetails {
  nodeName: 'details';
  dom: HTMLDetailsElement;
  protected constructor() {
    super();
    this.nodeName = 'details';
    this.dom = document.createElement(this.nodeName);
  }
}
