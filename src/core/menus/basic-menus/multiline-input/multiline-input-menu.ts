import { MultilineInputSvg } from '../../../../../type-dom/components/svgs/multiline-input/multiline-input';
import { Span } from '../../../../../type-dom/element/html-element/span/span.class';
import { MultilineInputControl } from '../../../controls/basic/multiline-input/multiline-input.class';
import { ControlMenu } from '../../menu.abstract';
import { BasicMenus } from '../basic-menus';
// import html from './multiline-input-menu.html';
export class MultilineInputMenu extends ControlMenu {
  className: 'MultilineInputMenu';
  childNodes: [MultilineInputSvg, Span];
  svg: MultilineInputSvg;
  ControlClass: typeof MultilineInputControl;

  constructor(public parent: BasicMenus) {
    super();
    this.className = 'MultilineInputMenu';
    this.ControlClass = MultilineInputControl;
    this.addAttrName('multiline-input-menu');
    this.svg = new MultilineInputSvg(this);
    this.svg.resetSize(24, 24);
    this.textNode.setText('多行输入');
    this.childNodes = [this.svg, this.titleSpan];
    this.initEvents();
  }
}
