import { Span } from '../../../../../type-dom/element/html-element/span/span.class';
import { Label } from '../../../../../type-dom/element/html-element/label/label.class';
import { Select } from '../../../../../type-dom/element/html-element/select/select.class';
import { RadioGroup } from '../../../../../type-dom/components/radio-group/radio-group.class';
import { CheckboxGroup } from '../../../../../type-dom/components/checkbox-group/checkbox-group.class';
import { FormItem } from '../form-item.abstract';
import { IConfigItem } from './config-item.interface';

// todo 现在没有什么用了
export abstract class ConfigItem extends FormItem implements IConfigItem {
  abstract childNodes: [Label, RadioGroup | CheckboxGroup | Select, Span];
  abstract itemContent: RadioGroup | CheckboxGroup | Select;
}
