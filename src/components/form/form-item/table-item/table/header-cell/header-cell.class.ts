import {
  TypeTableHeaderCell
} from '../../../../../../../type-dom/type-element/type-html/table/header-cell/header-cell.class';
import { TextNode } from '../../../../../../../type-dom/text-node/text-node.class';
import { TableHead } from '../head/head.class';
import { ITableHeaderCell } from './header-cell.interface';
// 表格表头
export class TableHeaderCell extends TypeTableHeaderCell implements ITableHeaderCell {
  className: 'TableHeaderCell';
  constructor(public parent: TableHead) {
    super();
    this.className = 'TableHeaderCell';
  }
  createInstance(thLiteral: ITableHeaderCell): void {
    if (thLiteral.propObj) {
      this.setPropObj(thLiteral.propObj);
    }
    thLiteral.childNodes.forEach((textNode, index) => {
      if (this.childNodes[index]) {
        this.childNodes[index].setText(textNode.nodeValue);
      } else {
        const textObj = new TextNode(this);
        textObj.setText(textNode.nodeValue);
        this.appendChild(textObj);
      }
    });
  }
}
