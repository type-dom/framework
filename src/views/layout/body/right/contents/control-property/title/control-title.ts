import { TableHead } from '../../../../../../../components/form/form-item/table-item/table/head/head.class';
import { FormEditor } from '../../../../../../../form-editor';
import { FieldProperty } from '../../field-property/field-property';
import { PropertyInput } from '../../property-item/input/property-input.abstract';
import { ControlProperty } from '../control-property';

// 控件标题属性
export class ControlTitleProperty extends PropertyInput {
  className: 'ControlTitleProperty';

  constructor(public parent: ControlProperty | FieldProperty) {
    super('控件标题', '请输入控件标题');
    // console.log('control title property constructor . ');
    this.className = 'ControlTitleProperty';
    this.addAttrName('control-title-property');
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
  // 选中控件时，重置控件属性 ---> 重置控件标题
  controlPropertyReset(value?: string): void {
    if (value !== undefined) {
      FormEditor.selectedControl?.resetLabelText(this.content.dom.value);
      return;
    }
    if (this.styleObj.display === 'none') this.setStyle('display', 'block');
    if (FormEditor.selectedControl?.formItem.labelText?.nodeValue) {
      this.resetInputValue(FormEditor.selectedControl.formItem.labelText.nodeValue);
    } else {
      this.resetInputValue('');
    }
  }

  fieldPropertyReset(value?: string): void {
    if (!FormEditor.selectedTableDataCell) {
      console.error('AppRoot.selectedTableDataCell is null .');
      return;
    }
    if (value !== undefined) {
      const table = FormEditor.selectedTableDataCell.parent.parent;
      const tableHeader = FormEditor.selectedTableDataCell.parent.parent.config?.tableHeader;
      const index = FormEditor.selectedTableDataCell.index;
      if (tableHeader && index !== undefined) {
        tableHeader[index].label = value;
        // 修改表头标签
        (table.childNodes[0] as TableHead).childNodes[index].childNodes[0].setText(value);
        (table.childNodes[0] as TableHead).childNodes[index].render();
      }
      console.log('tableHeader is ', tableHeader);
      return;
    }
    if (this.styleObj.display === 'none') this.setStyle('display', 'block');
    const tableHeader = FormEditor.selectedTableDataCell?.parent.parent.config?.tableHeader;
    // console.log('tableHeader is ', tableHeader);
    const index = FormEditor.selectedTableDataCell?.index;
    // console.log('index is ', index);
    if (tableHeader && index !== undefined) {
      // console.log('tableHeader[index].label is ', tableHeader[index].label);
      this.resetInputValue(tableHeader[index].label);
    } else {
      this.resetInputValue('');
    }
  }
}
