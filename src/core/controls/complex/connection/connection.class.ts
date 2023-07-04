import { fromEvent, Observable } from 'rxjs';
import { ButtonItem } from '../../../../components/form/form-item/button-item/button-item.class';
import { TableDataCell } from '../../../../components/form/form-item/table-item/table/data-cell/data-cell.class';
import { WebPage } from '../../../page/web-page.class';
import { WebComplexControl } from '../complex.abstract';
import { IConnectionControl } from './connection.interface';

export class ConnectionControl extends WebComplexControl implements IConnectionControl {
  className: 'ConnectionControl';
  childNodes: [ButtonItem];
  formItem: ButtonItem;
  readonly connectionItemObservable: Observable<Event>;
  constructor(parent: WebPage | TableDataCell) {
    super(parent);
    this.className = 'ConnectionControl';
    this.propObj.attrObj.name = 'connection-control';
    this.formItem = new ButtonItem(this, '关联选项');
    this.formItem.itemContent.addAttrObj({
      value: '选择'
    });
    this.childNodes = [this.formItem];
    // 在表格中时，点击会先触发，导致 selectedTableDataCell没有值。所以要延时触发。
    this.connectionItemObservable = fromEvent(this.formItem.dom, 'click');
    this.initEvents();
  }

  get connectionConfigLabel(): string {
    return this.attrObj['connection-config-label'] as string;
  }
  set connectionConfigLabel(value: string) {
    this.setAttribute('connection-config-label', value);
  }
  get connectionConfigValue(): string {
    // 兼容老数据
    if (this.attrObj['connection-item']) {
      return this.attrObj['connection-item'] as string;
    }
    return this.attrObj['connection-config-value'] as string;
  }
  set connectionConfigValue(text: string) {
    this.setAttribute('connection-config-value', text);
  }

  resetConnectionConfig(label:string, value: string): void {
    this.connectionConfigValue = value;
    this.connectionConfigLabel = label;
  }
}
