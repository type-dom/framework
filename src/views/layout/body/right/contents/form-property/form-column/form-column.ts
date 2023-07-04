import { controlStyle } from '../../../../../../../core/controls/web-control.const';
import { IOptionConfig } from '../../../../../../../core/controls/web-control.interface';
import { FormEditor } from '../../../../../../../form-editor';
import { PropertyRadio } from '../../property-item/radio/property-radio.abstract';
import { FormProperty } from '../form-property';

const FormSizeConfig: IOptionConfig = {
  name: '表单列数',
  resultValue: 'large',
  options: [
    {
      label: '一列',
      value: '100%',
      checked: true,
    },
    {
      label: '二列',
      value: '50%',
      checked: false,
    },
    // {
    //   label: '三列',
    //   value: '33.33%',
    //   checked: false,
    // },
    {
      label: '四列',
      value: '25%',
      checked: false,
    },
  ]
};

// 表单列数属性
export class FormColumnProperty extends PropertyRadio {
  className: 'FormColumnProperty';

  constructor(public parent: FormProperty) {
    super('表单列数', FormSizeConfig);
    // console.log('control title property constructor . ');
    this.className = 'FormColumnProperty';
    this.addAttrName('form-column-property');
    // console.log('this.dom is ', this.dom);
  }

  // 表单列数
  reset(value?: string): void {
    if (value !== undefined) {
      controlStyle.width = value; // 改变新建控件的宽度。
      FormEditor.allControls.forEach(control => {
        if (control.className === 'TableControl') {
          control.setStyleObj({
            width: '100%',
          });
          return;
        }
        control.setStyleObj({
          width: value,
        });
      });
      return;
    }
  //   todo 获取表单列数
  }
}
