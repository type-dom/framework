import { InputItem } from '../../../../components/form/form-item/input-item/input-item.class';
import { TableDataCell } from '../../../../components/form/form-item/table-item/table/data-cell/data-cell.class';
import { WebPage } from '../../../page/web-page.class';
import { WebBasicControl } from '../basic.abstract';
import { ITimeControl } from './time.interface';

export class TimeControl extends WebBasicControl implements ITimeControl {
  className: 'TimeControl';
  formItem: InputItem;
  childNodes: [InputItem];
  constructor(parent: WebPage | TableDataCell) {
    super(parent);
    this.nodeName = 'div';
    this.dom = document.createElement(this.nodeName);
    this.className = 'TimeControl';
    this.propObj.attrObj.name = 'time-control';
    // this.createInputItem('数字输入', '请输入数字');
    this.formItem = new InputItem(this, '时间', '请选择时间');
    this.formItem.itemContent.addAttrObj({
      type: 'time',
    });
    this.childNodes = [this.formItem];
    this.initEvents();
  }
}
