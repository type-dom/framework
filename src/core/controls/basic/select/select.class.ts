import { SelectItem } from '../../../../components/form/form-item/select-item/select-item.class';
import { TableDataCell } from '../../../../components/form/form-item/table-item/table/data-cell/data-cell.class';
import { deepClone } from '../../../../utils';
import { WebPage } from '../../../page/web-page.class';
import { defaultOptionConfig } from '../../web-control.const';
import { IOptionConfig, IWebControl } from '../../web-control.interface';
import { WebBasicControl } from '../basic.abstract';
import { ISelectControl } from './select.inerface';

export class SelectControl extends WebBasicControl implements ISelectControl {
  className: 'SelectControl';
  childNodes: [SelectItem];
  formItem: SelectItem;
  constructor(parent: WebPage | TableDataCell) {
    super(parent);
    this.className = 'SelectControl';
    this.propObj.attrObj.name = 'select-control';
    this.formItem = new SelectItem(this, '下拉选择框');
    const optionsConfig = deepClone(Object.assign(defaultOptionConfig, { name: '下拉选择' + Math.random() }));
    this.setOptionConfig(optionsConfig);
    this.childNodes = [this.formItem];
    this.initEvents();
  }
  createInstance(controlLiteral: IWebControl): void { // ISelectControl 会报错
    super.createInstance(controlLiteral);
    if (this.optionConfig) {
      this.setOptionConfig(this.optionConfig);
      // this.formItem.itemContent.render(); // TODO 加载时，要重新渲染一遍 ？？？ 有问题
    } else {
      console.error('this.optionConfig is undefined . ');
    }
  }
  // 只有控件中调用
  setOptionConfig(optionConfig: IOptionConfig): void {
    // console.log('select setOptionConfig . ');
    this.optionConfig = optionConfig;
    const selectedOption = optionConfig.options.find(opt => String(opt.value) === String(optionConfig.resultValue).split('.')[0]);
    // console.error('selectedOption is ', selectedOption);
    if (!selectedOption?.options) {
      throw Error('选项有问题');
    }
    this.formItem.itemContent.setOptions(selectedOption.options, 0); // 不用render, formItem 还会再渲染一遍。
  }
}
