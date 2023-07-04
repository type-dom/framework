import { RadioItem } from '../../../../components/form/form-item/radio-item/radio-item.class';
import { TableDataCell } from '../../../../components/form/form-item/table-item/table/data-cell/data-cell.class';
import { deepClone } from '../../../../utils';
import { WebPage } from '../../../page/web-page.class';
import { defaultOptionConfig } from '../../web-control.const';
import { IOptionConfig, IWebControl } from '../../web-control.interface';
import { WebBasicControl } from '../basic.abstract';
import { IRadioControl } from './radio.interface';

export class RadioControl extends WebBasicControl implements IRadioControl {
  className: 'RadioControl';
  childNodes: [RadioItem];
  formItem: RadioItem;
  // optionsConfig: IOptionConfig;
  constructor(parent: WebPage | TableDataCell) {
    super(parent);
    this.className = 'RadioControl';
    this.propObj.attrObj.name = 'radio-control';
    this.formItem = new RadioItem(this, '单选');
    const optionConfig = deepClone(defaultOptionConfig);
    this.setOptionConfig(optionConfig);
    // this.formItem.itemContent.setOptionConfig(optionConfig);
    // this.optionConfig = optionConfig;
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
