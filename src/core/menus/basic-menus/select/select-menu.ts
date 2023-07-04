import { SelectSvg } from '../../../../../type-dom/components/svgs/select/select';
import { Span } from '../../../../../type-dom/element/html-element/span/span.class';
import { SelectControl } from '../../../controls/basic/select/select.class';
import { ControlMenu } from '../../menu.abstract';
import { BasicMenus } from '../basic-menus';
// import html from './select-menu.html';
export class SelectMenu extends ControlMenu {
  className: 'SelectMenu';
  childNodes: [SelectSvg, Span];
  svg: SelectSvg;
  ControlClass: typeof SelectControl;

  constructor(public parent: BasicMenus) {
    super();
    this.className = 'SelectMenu';
    this.ControlClass = SelectControl;
    this.addAttrName('select-menu');
    this.svg = new SelectSvg(this);
    this.textNode.setText('下拉选择');
    this.childNodes = [this.svg, this.titleSpan];
    this.initEvents();
  }
}
