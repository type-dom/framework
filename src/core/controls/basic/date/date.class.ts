import { InputItem } from '../../../../components/form/form-item/input-item/input-item.class';
import { TableDataCell } from '../../../../components/form/form-item/table-item/table/data-cell/data-cell.class';
import { WebPage } from '../../../page/web-page.class';
import { WebBasicControl } from '../basic.abstract';
import { IDateControl } from './date.interface';

export class DateControl extends WebBasicControl implements IDateControl {
  className: 'DateControl';
  formItem: InputItem;
  childNodes: [InputItem];
  constructor(parent: WebPage | TableDataCell) {
    super(parent);
    this.nodeName = 'div';
    this.dom = document.createElement(this.nodeName);
    this.className = 'DateControl';
    this.propObj.attrObj.name = 'date-control';
    // this.createInputItem('数字输入', '请输入数字');
    this.formItem = new InputItem(this, '日期');
    this.formItem.itemContent.addAttrObj({
      type: 'date',
      placeholder: false,
    });
    this.childNodes = [this.formItem];
    // parent.controlObjMap.set(WebControl.maxCtrlId, this);
    this.initEvents();
  }
}
