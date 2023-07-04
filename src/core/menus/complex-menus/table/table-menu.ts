import { TableSvg } from '../../../../../type-dom/components/svgs/table/table';
import { Span } from '../../../../../type-dom/element/html-element/span/span.class';
import { TableControl } from '../../../controls/complex/table/table.class';
import { ControlMenu } from '../../menu.abstract';
import { ComplexMenus } from '../complex-menus';
// import html from './table-menu.html';
export class TableMenu extends ControlMenu {
  className: 'TableMenu';
  childNodes: [TableSvg, Span];
  svg: TableSvg;
  ControlClass: typeof TableControl;

  constructor(public parent: ComplexMenus) {
    super();
    this.className = 'TableMenu';
    this.ControlClass = TableControl;
    this.addAttrName('table-menu');
    this.svg = new TableSvg(this);
    this.svg.resetSize(24, 24);
    this.textNode.setText('表格');
    this.childNodes = [this.svg, this.titleSpan];
    this.initEvents();
  }
}
