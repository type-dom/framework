import { IOptionConfig } from '../../../../../../../core/controls/web-control.interface';
import { Input } from '../../../../../../../../type-dom/element/html-element/input/input.class';
import { Textarea } from '../../../../../../../../type-dom/element/html-element/textarea/textarea.class';
import { TextNode } from '../../../../../../../../type-dom/text-node/text-node.class';
import { FormEditor } from '../../../../../../../form-editor';
import { FieldProperty } from '../../field-property/field-property';
import { PropertyRadio } from '../../property-item/radio/property-radio.abstract';
import { ControlProperty } from '../control-property';

const requiredConfigs: IOptionConfig = {
  name: '必填' + Math.random(),
  resultValue: 'required',
  options: [
    {
      label: '是',
      value: 'required',
      checked: false,
    },
    {
      label: '否',
      value: '',
      checked: true,
    },
  ]
};
// 标题对齐属性
export class RequiredProperty extends PropertyRadio {
  className: 'RequiredProperty';
  constructor(public parent: ControlProperty | FieldProperty) {
    super('必填', requiredConfigs);
    // console.log('control title property constructor . ');
    this.className = 'RequiredProperty';
    this.addAttrName('require-property');
    // console.log('this.dom is ', this.dom);
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
      if (
        FormEditor.selectedControl?.itemContent instanceof Input
        || FormEditor.selectedControl?.itemContent instanceof Textarea
      ) {
        FormEditor.selectedControl?.itemContent.setAttribute('required', !!value);
      }
      return;
    }
    // when select control
    console.log('this.styleObj.display is ', this.styleObj.display);
    if (this.styleObj.display === 'none') this.show();
    const required = !!FormEditor.selectedControl?.formItem.itemContent.attrObj.required;
    console.log('required is ', required);
    this.resetResultValue(required ? 'required' : '');
  }
  fieldPropertyReset(value?: string): void {
    if (!FormEditor.selectedTableDataCell) {
      console.error('AppRoot.selectedTableDataCell is null . ');
      return;
    }
    if (FormEditor.selectedTableDataCell.control instanceof TextNode) {
      console.error('AppRoot.selectedTableDataCell.control is not WebControl . ');
      return;
    }
    if (value !== undefined) {
      if (
        FormEditor.selectedTableDataCell.control.itemContent instanceof Input
        || FormEditor.selectedTableDataCell.control.itemContent instanceof Textarea
      ) {
        FormEditor.selectedTableDataCell.control.itemContent.setAttribute('required', !!value);
      }
      return;
    }
    // when select control
    console.log('this.styleObj.display is ', this.styleObj.display);
    if (this.styleObj.display === 'none') this.show();
    const required = !!FormEditor.selectedTableDataCell.control.formItem.itemContent.attrObj.required;
    console.log('required is ', required);
    this.resetResultValue(required ? 'required' : '');
  }
}
