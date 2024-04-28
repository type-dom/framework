import { TextNode } from '../../../../text-node/text-node.class';
import { TypeHtml } from '../../type-html.abstract';
import type { ITypeTableHeaderCell } from './header-cell.interface';

// 表格表头 table header cell
export abstract class TypeTableHeaderCell
  extends TypeHtml
  implements ITypeTableHeaderCell {
  nodeName: 'th';
  dom: HTMLElement;
  override childNodes: TextNode[];

  protected constructor() {
    super();
    this.nodeName = 'th';
    this.dom = document.createElement(this.nodeName);
    this.childNodes = [];
  }
}
