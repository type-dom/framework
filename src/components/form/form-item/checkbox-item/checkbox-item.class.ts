import { Span } from '../../../../../type-dom/element/html-element/span/span.class';
import { Label } from '../../../../../type-dom/element/html-element/label/label.class';
import { CheckboxGroup } from '../../../../../type-dom/components/checkbox-group/checkbox-group.class';
import { WebControl } from '../../../../core/controls/web-control.abstract';
import { itemContentStyle } from '../../../../core/controls/web-control.const';
import { ConfigItem } from '../config-item/config-item.class';
import { ICheckboxItem } from './checkbox-item.interface';

export class CheckboxItem extends ConfigItem implements ICheckboxItem {
  className: 'CheckboxItem';
  childNodes: [Label, CheckboxGroup, Span];
  itemContent: CheckboxGroup;
  constructor(public parent: WebControl, labelText = '复选') {
    super(labelText);
    this.className = 'CheckboxItem';
    this.itemContent = new CheckboxGroup(this);
    this.itemContent.propObj.styleObj = Object.assign({}, itemContentStyle, { height: '100%' });
    this.childNodes = [this.label, this.itemContent, this.deleteSpan];
  }
}
