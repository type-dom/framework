import { InputItem } from '../../../../components/form/form-item/input-item/input-item.class';
import { TableDataCell } from '../../../../components/form/form-item/table-item/table/data-cell/data-cell.class';
import { WebPage } from '../../../page/web-page.class';
import { WebBasicControl } from '../basic.abstract';
import { ISingleInputControl } from './single-input.inerface';

export class SingleInputControl extends WebBasicControl implements ISingleInputControl {
  className: 'SingleInputControl';
  childNodes: [InputItem];
  formItem: InputItem;
  constructor(parent: WebPage | TableDataCell) {
    super(parent);
    // console.log('TableControl constructor input值',parent);
    // console.log('TableControl constructor input值2222',this);
    //  debugger;
    this.className = 'SingleInputControl';
    this.propObj.attrObj.name = 'single-input-control';
    // this.createInputItem('单行输入', '请输入');
    // const config: IInputConfig = {
    //   label: '单行输入',
    //   placeHolder: '请输入'
    // };
    this.formItem = new InputItem(this, '单行输入', '请输入');
    this.childNodes = [this.formItem];
    if (this.defaultValue) {
      this.formItem.itemContent.setValue(this.defaultValue);
    }
    this.initEvents();
  }
}
