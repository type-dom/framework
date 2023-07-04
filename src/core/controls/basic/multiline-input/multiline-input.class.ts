import { TextareaItem } from '../../../../components/form/form-item/textarea-item/textarea-item.class';
import { TableDataCell } from '../../../../components/form/form-item/table-item/table/data-cell/data-cell.class';
import { WebPage } from '../../../page/web-page.class';
import { WebBasicControl } from '../basic.abstract';
import { IMultilineInputControl } from './multiline-input.inerface';

export class MultilineInputControl extends WebBasicControl implements IMultilineInputControl {
  className: 'MultilineInputControl';
  childNodes: [TextareaItem];
  formItem: TextareaItem;

  constructor(parent: WebPage | TableDataCell) {
    super(parent);
    // console.log('parent', parent);
    this.className = 'MultilineInputControl';
    this.propObj.attrObj.name = 'multiline-input-control';
    this.formItem = new TextareaItem(this, '多行输入', '请输入');
    this.childNodes = [this.formItem];
    console.error('parent instanceof WebTableDataCell');
    this.initEvents();
  }
}
