import { TypeHtml } from '../type-html.abstract';
import type { ITypeOptGroup } from './opt-group.interface';
export abstract class TypeOptGroup extends TypeHtml implements ITypeOptGroup {
  nodeName: 'optgroup';
  dom: HTMLOptGroupElement;
  protected constructor() {
    super();
    this.nodeName = 'optgroup';
    this.dom = document.createElement(this.nodeName);
  }
}
