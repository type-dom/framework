import { AttachmentSvg } from '../../../../../type-dom/components/svgs/attachment/attachment';
import { Span } from '../../../../../type-dom/element/html-element/span/span.class';
import { AttachmentControl } from '../../../controls/basic/attachment/attachment.class';
import { ControlMenu } from '../../menu.abstract';
import { BasicMenus } from '../basic-menus';

export class AttachmentMenu extends ControlMenu {
  className: 'AttachmentMenu';
  childNodes: [AttachmentSvg, Span];
  ControlClass: typeof AttachmentControl;
  svg: AttachmentSvg;
  constructor(public parent: BasicMenus) {
    super();
    this.className = 'AttachmentMenu';
    this.ControlClass = AttachmentControl;
    this.addAttrName('attachment-menu');
    this.svg = new AttachmentSvg(this);
    this.svg.resetSize(24, 24);
    this.textNode.setText('附件');
    this.childNodes = [this.svg, this.titleSpan];
    this.initEvents();
  }
}
