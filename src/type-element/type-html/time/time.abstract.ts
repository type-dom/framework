import { TypeHtml } from '../type-html.abstract';
import { ITypeTime } from './time.interface';
export abstract class TypeTime extends TypeHtml implements ITypeTime {
  nodeName: 'time';
  dom: HTMLTimeElement;
  protected constructor() {
    super();
    this.nodeName = 'time';
    this.dom = document.createElement(this.nodeName);
  }
}
