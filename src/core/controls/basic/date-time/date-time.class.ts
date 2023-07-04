import { InputItem } from '../../../../components/form/form-item/input-item/input-item.class';
import { TableDataCell } from '../../../../components/form/form-item/table-item/table/data-cell/data-cell.class';
import { WebPage } from '../../../page/web-page.class';
import { WebBasicControl } from '../basic.abstract';
import { IDateTimeControl } from './date-time.interface';

export class DateTimeControl extends WebBasicControl implements IDateTimeControl {
  className: 'DateTimeControl';
  formItem: InputItem;
  childNodes: [InputItem];
  constructor(parent: WebPage | TableDataCell) {
    super(parent);
    this.nodeName = 'div';
    this.dom = document.createElement(this.nodeName);
    this.className = 'DateTimeControl';
    this.addAttrName('datetime-control');
    // this.createInputItem('数字输入', '请输入数字');
    this.formItem = new InputItem(this, '日期时间');
    this.formItem.itemContent.addAttrObj({
      type: 'datetime-local', // chrome不支持datetime, IE，fireFox都不支持。
      placeholder: false,
    });
    this.childNodes = [this.formItem];
    this.initEvents();
  }
}
