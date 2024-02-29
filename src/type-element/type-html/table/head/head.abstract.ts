import { TypeHtml } from '../../type-html.abstract';
import { TypeTableHeaderCell } from '../header-cell/header-cell.abstract';
import type { ITypeTableHead } from './head.interface';

// 表格页眉
export abstract class TypeTableHead extends TypeHtml implements ITypeTableHead {
  nodeName: 'thead';
  dom: HTMLTableSectionElement;
  declare childNodes: TypeTableHeaderCell[];
  protected constructor() {
    super();
    this.nodeName = 'thead';
    this.dom = document.createElement(this.nodeName);
    this.childNodes = [];
  }
}
