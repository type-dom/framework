import { RadioGroup } from '../../../../../type-dom/components/radio-group/radio-group.class';
import { Span } from '../../../../../type-dom/element/html-element/span/span.class';
import { Label } from '../../../../../type-dom/element/html-element/label/label.class';
import { WebControl } from '../../../../core/controls/web-control.abstract';
import { itemContentStyle } from '../../../../core/controls/web-control.const';
import { ConfigItem } from '../config-item/config-item.class';
import { IRadioItem } from './radio-item.interface';

export class RadioItem extends ConfigItem implements IRadioItem {
  className: 'RadioItem';
  childNodes: [Label, RadioGroup, Span];
  itemContent: RadioGroup;
  constructor(public parent: WebControl, labelText = '单选') {
    super(labelText);
    this.className = 'RadioItem';
    this.itemContent = new RadioGroup(this);
    this.itemContent.propObj.styleObj = Object.assign({}, itemContentStyle, { height: '100%' });
    this.childNodes = [this.label, this.itemContent, this.deleteSpan];
  }
}
