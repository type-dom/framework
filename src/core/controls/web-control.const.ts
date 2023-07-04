import { IStyle } from '../../../type-dom/style/style.interface';
import { Display } from '../../../type-dom/style/style.enum';
import { IOptionConfig } from './web-control.interface';

export const controlStyle: Partial<IStyle> = {
  // position: StylePosition.absolute,
  // left: '0',
  // top: '0',
  display: 'inline-block',
  width: '100%',
  // height: '95px',
  padding: '10px 10px 0 10px',
  marginBottom: '10px!important',
  border: '1px dashed #e2e0e0',
  boxSizing: 'border-box',  // todo content-box or border-box
  zIndex: 9,
};

export const formItemStyle: Partial<IStyle> = {
  border: '1px solid #1890ff',
  background: '#f3f9ff',
  padding: '10px',
  marginBottom: '10px!important',
  fontSize: '14px',
  display: 'block',
};

export const labelStyle: Partial<IStyle> = {
  width: '100px',
  lineHeight: '32px',
  textAlign: 'right',
  verticalAlign: 'middle',
  float: 'left',
  fontSize: '14px',
  color: '#606266',
  padding: '0 12px 0 0',
  // '-webkit-box-sizing': 'border-box',
  boxSizing: 'border-box',
};

export const itemContentStyle: Partial<IStyle> = {
  height: '32px',
  lineHeight: '32px',
  paddingLeft: '43px',
  paddingRight: '43px',
  textAlign: 'center',
  backgroundColor: '#FFF',
  backgroundImage: 'none',
  borderRadius: '4px',
  border: '1px solid #DCDFE6',
  // -webkit-box-sizing: border-box;
  boxSizing: 'border-box',
  color: '#606266',
  display: Display.inlineBlock,
  fontSize: 'inherit',
  outline: '0',
  padding: '0 15px',
  margin: '0',
  // -webkit-transition: border-color .2s cubic-bezier(.645,.045,.355,1);
  transition: 'border-color .2s cubic-bezier(.645,.045,.355,1)',
  width: 'calc(100% - ' + labelStyle.width + ')',
};

export const defaultOptionConfig: IOptionConfig = {
  name: 'option-config',
  resultValue: 1,
  options: [
    {
      label: '选项一',
      value: 1,
      checked: true,
      selected: true,
      options: [
        {
          label: '选项一/1',
          value: 11,
          checked: true,
          selected: true,
        },
        {
          label: '选项一/2',
          value: 12,
          checked: false,
          selected: false,
        },
        {
          label: '选项一/3',
          value: 13,
          checked: false,
          selected: false
        }
      ]
    },
    {
      label: '选项二',
      value: 2,
      checked: false,
      selected: false,
      options: [
        {
          label: '选项二/1',
          value: 21,
          checked: false,
          selected: false,
        },
        {
          label: '选项二/2',
          value: 22,
          checked: false,
          selected: false,
        },
        {
          label: '选项二/3',
          value: 23,
          checked: false,
          selected: false,
        }
      ]
    },
    {
      label: '选项三',
      value: 3,
      checked: false,
      selected: false,
      options: [
        {
          label: '选项三/1',
          value: 31,
          checked: false,
          selected: false,
        },
        {
          label: '选项三/2',
          value: 32,
          checked: false,
          selected: false,
        },
        {
          label: '选项三/3',
          value: 33,
          checked: false,
          selected: false,
        }
      ]
    },
  ]
};

/**
 * 字段选项设置的默认值
 * 挂接在WebDocument类下。
 * 全局唯一
 */

export const fieldConfig: IOptionConfig = {
  name: 'selectOptions',
  resultValue: 0,
  options: [
    {
      label: '表1',
      value: 'table1',
      checked: false,
      selected: false,
      options: [
        {
          label: '字段1-1',
          value: 'table1.field1',
          checked: false,
          selected: false,
        },
        {
          label: '字段1-2',
          value: 'table1.field2',
          checked: false,
          selected: false,
        },
        {
          label: '字段1-3',
          value: 'table1.field3',
          checked: false,
          selected: false,
        },
      ]
    },
    {
      label: '表2',
      value: 'table2',
      checked: false,
      selected: false,
      options: [
        {
          label: '字段2-1',
          value: 'table2.field1',
          checked: false,
          selected: false,
        },
        {
          label: '字段2-2',
          value: 'table2.field2',
          checked: false,
          selected: false,
        },
        {
          label: '字段2-3',
          value: 'table2.field3',
          checked: false,
          selected: false,
        },
      ]
    },
    {
      label: '表3',
      value: 'table3',
      checked: false,
      selected: false,
      options: [
        {
          label: '字段3-1',
          value: 'table3.field1',
          checked: false,
          selected: false,
        },
        {
          label: '字段3-2',
          value: 'table3.field2',
          checked: false,
          selected: false,
        },
        {
          label: '字段3-3',
          value: 'table3.field3',
          checked: false,
          selected: false,
        },
      ]
    },
  ]
};
