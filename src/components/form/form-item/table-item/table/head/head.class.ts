import { fromEvent } from 'rxjs';
import { TypeTableHead } from '../../../../../../../type-dom/type-element/type-html/table/head/head.class';
import { TextNode } from '../../../../../../../type-dom/text-node/text-node.class';
import { ITableField } from '../../../../../../core/controls/complex/table/table.interface';
import { FormEditor } from '../../../../../../form-editor';
import { TableHeaderCell } from '../header-cell/header-cell.class';
import { Table } from '../table.class';
import { ITableHead } from './head.interface';

// 表格页眉
export class TableHead extends TypeTableHead implements ITableHead {
  className: 'TableHead';
  childNodes: TableHeaderCell[];

  constructor(public parent: Table, th: ITableField[] = []) {
    super();
    this.nodeName = 'thead';
    this.dom = document.createElement(this.nodeName);
    this.className = 'TableHead';
    this.childNodes = [];
    this.setHeadItems(th);
    this.initEvents();
  }

  setHeadItems(th: ITableField[]): void {
    this.clearChildDom();
    this.clearChildNodes();
    for (const field of th) {
      const tableHeader = new TableHeaderCell(this);
      const text = new TextNode(tableHeader, field.label);
      tableHeader.setAttrName(field.name);
      tableHeader.childNodes.push(text);
      this.childNodes.push(tableHeader);
    }
  }

  createInstance(tHeadLiteral: ITableHead): void {
    if (tHeadLiteral.propObj) {
      this.setPropObj(tHeadLiteral.propObj);
    }
    tHeadLiteral.childNodes.forEach((child, index) => {
      if (this.childNodes[index]) {
        this.childNodes[index].createInstance(child);
      } else {
        const th = new TableHeaderCell(this);
        th.createInstance(child);
        this.appendChild(th);
      }

    });
  }
  initEvents(): void {
    this.events.push(
      fromEvent(this.dom, 'click').subscribe(() => {
        FormEditor.setSelectedTableDataCell(null);
      })
    );
  }
}
