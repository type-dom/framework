import { CheckboxItem } from '../../../../components/form/form-item/checkbox-item/checkbox-item.class';
import { TableDataCell } from '../../../../components/form/form-item/table-item/table/data-cell/data-cell.class';
import { deepClone } from '../../../../utils';
import { WebPage } from '../../../page/web-page.class';
import { defaultOptionConfig } from '../../web-control.const';
import { IOptionConfig, IWebControl } from '../../web-control.interface';
import { WebControl } from '../../web-control.abstract';
import { ICheckboxControl } from './checkbox.interface';
export class CheckboxControl extends WebControl implements ICheckboxControl {
  className: 'CheckboxControl';
  childNodes: [CheckboxItem];
  formItem: CheckboxItem;
  constructor(parent: WebPage | TableDataCell) {
    super(parent);
    this.className = 'CheckboxControl';
    this.propObj.attrObj.name = 'checkbox-control';
    this.formItem = new CheckboxItem(this, '复选');
    const config = deepClone(defaultOptionConfig);
    this.setOptionConfig(config);
    this.childNodes = [this.formItem];
    this.initEvents();
  }
  createInstance(controlLiteral: IWebControl): void {
    super.createInstance(controlLiteral);
    if (this.optionConfig) {
      this.setOptionConfig(this.optionConfig);
    } else {
      console.error('this.optionConfig is undefined . ');
    }
  }
  setOptionConfig(optionConfig: IOptionConfig): void {
    this.optionConfig = optionConfig;
    const selectedOption = optionConfig.options.find(opt => String(opt.value) === String(optionConfig.resultValue).split('.')[0]);
    // console.log('selectedOption is ', selectedOption);
    if (!selectedOption?.options) {
      throw Error('选项有问题');
    }
    this.formItem.itemContent.setOptions(selectedOption.options);
  }
}
