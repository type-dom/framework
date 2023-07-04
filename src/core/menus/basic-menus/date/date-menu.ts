import { DateSvg } from '../../../../../type-dom/components/svgs/date/date';
import { Span } from '../../../../../type-dom/element/html-element/span/span.class';
import { DateControl } from '../../../controls/basic/date/date.class';
import { ControlMenu } from '../../menu.abstract';
import { BasicMenus } from '../basic-menus';
// import html from './date-menu.html';

export class DateMenu extends ControlMenu {
  className: 'DateMenu';
  childNodes: [DateSvg, Span];
  svg: DateSvg;
  ControlClass: typeof DateControl;

  constructor(public parent: BasicMenus) {
    super();
    this.className = 'DateMenu';
    this.ControlClass = DateControl;
    this.addAttrName('date-menu');
    this.svg = new DateSvg(this);
    this.svg.resetSize(24, 24);
    this.textNode.setText('日期');
    this.childNodes = [this.svg, this.titleSpan];
    this.initEvents();
  }
}
