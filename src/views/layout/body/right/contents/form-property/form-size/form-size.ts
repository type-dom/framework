import { FormProperty } from '../form-property';
import { PropertyRadio } from '../../property-item/radio/property-radio.abstract';
import { IOptionConfig } from '../../../../../../../core/controls/web-control.interface';

const FormSizeConfig: IOptionConfig = {
  name: '表单尺寸',
  resultValue: 'large',
  options: [
    {
      label: '大',
      value: 'large',
      checked: true,
    },
    {
      label: '中',
      value: 'middle',
      checked: false,
    },
    {
      label: '小',
      value: 'small',
      checked: false,
    },
  ]
};
// 表单尺寸属性
export class FormSizeProperty extends PropertyRadio {
  className: 'FormSizeProperty';

  constructor(public parent: FormProperty) {
    super('表单尺寸', FormSizeConfig);
    // console.log('control title property constructor . ');
    this.className = 'FormSizeProperty';
    this.addAttrName('form-size-property');
    // console.log('this.dom is ', this.dom);
  }

  // todo 表单尺寸的样式
  reset(value: string): void {
    //
  }
}
