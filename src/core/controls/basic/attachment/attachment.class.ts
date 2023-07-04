import { fromEvent, Observable } from 'rxjs';
import { InputItem } from '../../../../components/form/form-item/input-item/input-item.class';
import { TableDataCell } from '../../../../components/form/form-item/table-item/table/data-cell/data-cell.class';
import { WebPage } from '../../../page/web-page.class';
import { WebBasicControl } from '../basic.abstract';
import { IAttachmentControl } from './attachment.interface';

export class AttachmentControl extends WebBasicControl implements IAttachmentControl {
  className: 'AttachmentControl';
  formItem: InputItem;
  childNodes: [InputItem];
  attachmentObservable: Observable<Event>;
  constructor(parent: WebPage | TableDataCell) {
    super(parent);
    this.nodeName = 'div';
    this.dom = document.createElement(this.nodeName);
    this.className = 'AttachmentControl';
    this.propObj.attrObj.name = 'attachment-control';
    // this.createInputItem('数字输入', '请输入数字');
    this.formItem = new InputItem(this, '附件', '请选择附件');
    this.formItem.itemContent.addAttrObj({
      type: 'file',
    });
    this.childNodes = [this.formItem];
    this.attachmentObservable = fromEvent(this.itemContent.dom, 'change');
    this.initEvents();
  }
}
