import { PropertyInput } from '../../property-item/input/property-input.abstract';
import { ControlProperty } from '../control-property';
import { NumericalControl } from '../../../../../../../core/controls/basic/numerical/numerical.class';
import { FieldProperty } from '../../field-property/field-property';
import { FormEditor } from '../../../../../../../form-editor';

// 最大值，只对数值控件有效
export class MaxValueProperty extends PropertyInput {
  className: 'MaxValueProperty';

  constructor(public parent: ControlProperty | FieldProperty) {
    super('最大值', '请输入最大值');
    this.content.addAttribute('type', 'number');
    this.className = 'MaxValueProperty';
    this.addAttribute('name', 'control-max-value-property');
  }

  reset(value?: string): void {
    console.log('value is ', value);
    if (this.parent instanceof ControlProperty) {
      this.controlPropertyReset(value);
    }
    if (this.parent instanceof FieldProperty) {
      this.fieldPropertyReset(value);
    }
  }
  controlPropertyReset(value?: string): void {
    if (value !== undefined) {
      if (FormEditor.selectedControl instanceof NumericalControl) {
        FormEditor.selectedControl?.formItem.itemContent.setAttribute('max', value);
      } else {
        console.error('选中的控件不是数字控件。');
      }
      return;
    }
    if (FormEditor.selectedControl instanceof NumericalControl) {
      if (this.styleObj.display === 'none') this.show();
      const MaxValue = FormEditor.selectedControl.formItem.itemContent.propObj.attrObj.max as string;
      if (MaxValue) {
        this.resetInputValue(MaxValue);
      } else {
        this.resetInputValue(0);
      }
    } else {
      // 不是数字控件，属性项要隐藏。
      this.hide();
    }
  }
  fieldPropertyReset(value?: string): void {
    if (value !== undefined) {
      if (FormEditor.selectedTableDataCell?.control instanceof NumericalControl) {
        FormEditor.selectedTableDataCell.control.formItem.itemContent.setAttribute('max', value);
      } else {
        console.error('AppRoot.selectedTableDataCell?.control is null . ');
      }
      return;
    }
    if (FormEditor.selectedTableDataCell?.control instanceof NumericalControl) {
      if (this.styleObj.display === 'none') this.show();
      const MaxValue = FormEditor.selectedTableDataCell.control.formItem.itemContent.propObj.attrObj.max as string;
      if (MaxValue) {
        this.resetInputValue(MaxValue);
      } else {
        this.resetInputValue(0);
      }
      return;
    } else {
      this.hide();
    }
  }
}
