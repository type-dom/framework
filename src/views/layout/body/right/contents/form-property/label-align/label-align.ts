import { FormEditor } from '../../../../../../../form-editor';
import { labelStyle } from '../../../../../../../core/controls/web-control.const';
import { TableControl } from '../../../../../../../core/controls/complex/table/table.class';
import { IOptionConfig } from '../../../../../../../core/controls/web-control.interface';
import { PropertyRadio } from '../../property-item/radio/property-radio.abstract';
import { FormProperty } from '../form-property';

const labelAlignConfigs: IOptionConfig = {
  name: '标签对齐' + Math.random(),
  resultValue: 'left',
  options: [
    {
      label: '左',
      value: 'left',
      checked: false,
    },
    {
      label: '中',
      value: 'center',
      checked: false,
    },
    {
      label: '右',
      value: 'right',
      checked: true,
    },
  ]
};
// 标题对齐属性
export class LabelAlignProperty extends PropertyRadio {
  className: 'LabelAlignProperty';
  constructor(public parent: FormProperty) {
    super('标签对齐', labelAlignConfigs);
    // console.log('control title property constructor . ');
    this.className = 'LabelAlignProperty';
    this.addAttrName('label-align-property');
    // console.log('this.dom is ', this.dom);
  }

  reset(value?: string): void {
    if (value !== undefined) {
      labelStyle.textAlign = value; // 改变新建控件的宽度。
      FormEditor.allControls.forEach(control => { // 循环遍历改变样式
        if (control instanceof TableControl) {
          return;
        }
        control.label?.setStyle('textAlign', value);
      });
      return;
    }
    // 获取表单对齐方式
    const align = labelStyle.textAlign;
    if (align) {
      this.resetResultValue(align);
    } else {
      this.resetResultValue('left');
    }
  }
}
