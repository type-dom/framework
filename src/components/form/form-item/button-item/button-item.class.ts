import { fromEvent } from 'rxjs';
import { Span } from '../../../../../type-dom/element/html-element/span/span.class';
import { Label } from '../../../../../type-dom/element/html-element/label/label.class';
import { Input } from '../../../../../type-dom/element/html-element/input/input.class';
import { WebControl } from '../../../../core/controls/web-control.abstract';
import { itemContentStyle } from '../../../../core/controls/web-control.const';
import { FormItem } from '../form-item.abstract';
import { IButtonItem } from './button-item.interface';

export class ButtonItem extends FormItem implements IButtonItem {
  className: 'ButtonItem';
  childNodes: [Label, Input, Span];
  itemContent: Input;
  constructor(public parent: WebControl, labelText = '控件名称') {
    super(labelText);
    this.className = 'ButtonItem';
    this.addAttrName('button-item');
    this.itemContent = new Input(this);
    this.itemContent.propObj = {
      styleObj: Object.assign({}, itemContentStyle),
      attrObj: {
        name: 'button-item-content',
        type: 'button',
        value: '选择',
      }
    };
    this.childNodes = [this.label, this.itemContent, this.deleteSpan];
    // this.childNodes.push(this.itemContent);
    this.initEvents();
  }
  initEvents(): void {
    this.events.push(
      fromEvent(this.itemContent.dom, 'click').subscribe(() => {
        console.log('button item itemContent click . ');
      })
    );
  }
  createInstance(itemLiteral: IButtonItem): void {
    super.createInstance(itemLiteral);
    // 文本 实例化
    this.itemContent.setAttrObj({
      value: itemLiteral.childNodes[1].propObj.attrObj.value || '选择',
    });
  }
}
