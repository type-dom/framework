import { TypeHtml } from '../../type-html.abstract';
import type { ITypeTableColGroup } from './col-group.interface';

export abstract class TypeTableColGroup
  extends TypeHtml
  implements ITypeTableColGroup {
  nodeName: 'colgroup';
  dom: HTMLTableColElement;

  protected constructor() {
    super();
    this.nodeName = 'colgroup';
    this.dom = document.createElement(this.nodeName);
  }
}
