import { fromEvent } from 'rxjs';
import { Label } from '../../../../../../../../type-dom/element/html-element/label/label.class';
import { Select } from '../../../../../../../../type-dom/element/html-element/select/select.class';
import { Button } from '../../../../../../../../type-dom/element/html-element/button/button.class';
import { itemContentStyle } from '../../../../../../../core/controls/web-control.const';
import { PropertyItem } from '../property-item.abstract';

export abstract class PropertySelect extends PropertyItem {
  abstract reset(value?: string): void;
  childNodes: [Label, Select, Button];
  select: Select;
  protected constructor(labelText = '控件名称') {
    super(labelText);
    this.select = new Select(this);
    this.select.propObj = {
      styleObj: Object.assign({}, itemContentStyle),
      attrObj: {
        name: 'property-select'
        // type: 'text',
        // placeholder: placeholder,
      }
    };

    this.childNodes = [this.label, this.select, this.button];
    this.initEvents();
  }

  initEvents(): void {
    this.events.push(
      // 如果只有一个选项时，监听change，input有问题。
      fromEvent(this.select.dom, 'click').subscribe((evt) => {
        console.log('this.select.dom click, event is ', evt);
        console.log('this.select.dom.value is ', this.select.dom.value);
        // console.log(this.reset);
        this.reset(this.select.dom.value);
      }),
      fromEvent(this.select.dom, 'change').subscribe((evt) => {
        console.log('this.select.dom change, event is ', evt);
        console.log('this.select.dom.value is ', this.select.dom.value);
        // console.log(this.reset);
        this.reset(this.select.dom.value);
      })
    );
  }
}
