import { ITypeDiv } from '../../../type-dom/type-element/type-html/div/div.interface';
import { AttachmentControl } from './basic/attachment/attachment.class';
import { DateControl } from './basic/date/date.class';
import { MultilineInputControl } from './basic/multiline-input/multiline-input.class';
import { NumericalControl } from './basic/numerical/numerical.class';
import { RadioControl } from './basic/radio/radio.class';
import { SelectControl } from './basic/select/select.class';
import { SingleInputControl } from './basic/single-input/single-input.class';
import { TextControl } from './basic/text/text.class';
import { TimeControl } from './basic/time/time.class';
import { CheckboxControl } from './basic/checkbox/checkbox.class';
import { TableControl } from './complex/table/table.class';
import { ConnectionControl } from './complex/connection/connection.class';
import { IFormItem } from '../../components/form/form-item/form-item.interface';

export interface IWebControl extends ITypeDiv {
  childNodes: [IFormItem],
}

export type ControlClass = typeof AttachmentControl
  | typeof DateControl
  | typeof MultilineInputControl
  | typeof NumericalControl
  | typeof RadioControl
  | typeof CheckboxControl
  | typeof SelectControl
  | typeof SingleInputControl
  | typeof TextControl
  | typeof TimeControl
  | typeof TableControl
  | typeof ConnectionControl;

export interface IOption {
  label: string,
  value: string | number | boolean,
  checked?: boolean, // radio checkbox
  selected?: boolean, // select
  options?: IOption[]
}

export interface IOptionConfig {
  name: string,
  // selectedOption: string | number | boolean,
  // 在级联控件中，resultValue应该是带 . 的值，是不同层级值拼接出来的。
  resultValue: string | number | boolean, // 不应该根据这个排队选中后的值，因为有可能是多选。
  options: IOption[]
}
