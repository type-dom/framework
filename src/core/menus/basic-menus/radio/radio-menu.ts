import { RadioSvg } from '../../../../../type-dom/components/svgs/radio/radio';
import { Span } from '../../../../../type-dom/element/html-element/span/span.class';
import { RadioControl } from '../../../controls/basic/radio/radio.class';
import { ControlMenu } from '../../menu.abstract';
import { BasicMenus } from '../basic-menus';
export class RadioMenu extends ControlMenu {
  className: string;
  childNodes: [RadioSvg, Span];
  svg: RadioSvg;
  ControlClass: typeof RadioControl;

  constructor(public parent: BasicMenus) {
    super();
    this.className = 'RadioMenu';
    this.ControlClass = RadioControl;
    this.addAttrName('radio-menu');
    this.svg = new RadioSvg(this);
    this.svg.resetSize(24, 24);
    this.textNode.setText('单选');
    this.childNodes = [this.svg, this.titleSpan];
    this.initEvents();
  }
}
