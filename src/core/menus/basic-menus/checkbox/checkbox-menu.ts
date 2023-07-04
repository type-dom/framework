import { CheckboxSvg } from '../../../../../type-dom/components/svgs/checkbox/checkbox';
import { Span } from '../../../../../type-dom/element/html-element/span/span.class';
import { CheckboxControl } from '../../../controls/basic/checkbox/checkbox.class';
import { ControlMenu } from '../../menu.abstract';
import { BasicMenus } from '../basic-menus';
export class CheckboxMenu extends ControlMenu {
  className: 'CheckboxMenu';
  childNodes: [CheckboxSvg, Span];
  svg: CheckboxSvg;
  ControlClass: typeof CheckboxControl;

  constructor(public parent: BasicMenus) {
    super();
    this.className = 'CheckboxMenu';
    this.ControlClass = CheckboxControl;
    this.addAttrName('checkbox-menu');
    this.svg = new CheckboxSvg(this);
    this.svg.resetSize(24, 24);
    this.textNode.setText('复选');
    this.childNodes = [this.svg, this.titleSpan];
    this.initEvents();
  }
}
