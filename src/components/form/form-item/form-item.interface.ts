import { Input } from '../../../../type-dom/element/html-element/input/input.class';
import { IInput } from '../../../../type-dom/element/html-element/input/input.interface';
import { Textarea } from '../../../../type-dom/element/html-element/textarea/textarea.class';
import { ITextarea } from '../../../../type-dom/element/html-element/textarea/textarea.interface';
import { Select } from '../../../../type-dom/element/html-element/select/select.class';
import { ISelect } from '../../../../type-dom/element/html-element/select/select.interface';
import { ILabel } from '../../../../type-dom/element/html-element/label/label.interface';
import { ISpan } from '../../../../type-dom/element/html-element/span/span.interface';
import { ITypeDiv } from '../../../../type-dom/type-element/type-html/div/div.interface';
import { RadioGroup } from '../../../../type-dom/components/radio-group/radio-group.class';
import { IRadioGroup } from '../../../../type-dom/components/radio-group/radio-group.interface';
import { CheckboxGroup } from '../../../../type-dom/components/checkbox-group/checkbox-group.class';
import { ICheckboxGroup } from '../../../../type-dom/components/checkbox-group/checkbox-group.interface';
import { Table } from './table-item/table/table.class';
import { ITable } from './table-item/table/table.interface';

export type ItemContent = Input | Textarea | Select | RadioGroup | CheckboxGroup | Table;
export type IItemContent = IInput | ITextarea | ISelect | IRadioGroup | ICheckboxGroup | ITable;

export interface IFormItem extends ITypeDiv {
  className: string, // 'ButtonItem' | 'CheckboxItem' | 'ConfigItem' | 'InputItem' | 'RadioItem' | 'SelectItem' | 'TableItem' | 'TextareaItem',
  childNodes: [ILabel, IItemContent, ISpan],
}
