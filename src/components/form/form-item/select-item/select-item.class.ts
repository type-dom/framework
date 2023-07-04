import { Span } from '../../../../../type-dom/element/html-element/span/span.class';
import { Label } from '../../../../../type-dom/element/html-element/label/label.class';
import { Select } from '../../../../../type-dom/element/html-element/select/select.class';
import { itemContentStyle } from '../../../../core/controls/web-control.const';
import { WebControl } from '../../../../core/controls/web-control.abstract';
import { ConfigItem } from '../config-item/config-item.class';
import { ISelectItem } from './select-item.interface';

export class SelectItem extends ConfigItem implements ISelectItem {
  className: 'SelectItem';
  childNodes: [Label, Select, Span]
  itemContent: Select;
  constructor(public parent: WebControl, labelText = '下拉选择') {
    super(labelText);
    this.className = 'SelectItem';
    this.itemContent = new Select(this);
    this.itemContent.propObj.styleObj = Object.assign({}, itemContentStyle);
    this.childNodes = [this.label, this.itemContent, this.deleteSpan];
  }
}
