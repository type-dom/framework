import { fromEvent } from 'rxjs';
import { TypeElement } from '../../../../../../../../type-dom/type-element/type-element.abstract';
import { TextNode } from '../../../../../../../../type-dom/text-node/text-node.class';
import { Label } from '../../../../../../../../type-dom/element/html-element/label/label.class';
import { Division } from '../../../../../../../../type-dom/element/html-element/division/division.class';
import { Button } from '../../../../../../../../type-dom/element/html-element/button/button.class';
import { IOption, IOptionConfig } from '../../../../../../../core/controls/web-control.interface';

import { PropertyItem } from '../property-item.abstract';
export abstract class PropertyRadio extends PropertyItem {
  childNodes: [Label, Division, Button];
  name: string;
  resultValue: string | number | boolean;
  optionDiv: Division;
  private selectedOpt!: Button;
  protected constructor(labelText = '单选', public config: IOptionConfig) {
    super(labelText);
    this.name = config.name;
    this.resultValue = config.resultValue;
    this.optionDiv = new Division(this);
    this.childNodes = [this.label, this.optionDiv, this.button];
    this.setOptions(config.options);
    this.initEvents();
  }

  abstract reset(value?: string): void;

  setOptions(options: IOption[]): void {
    options.forEach((option, index) => {
      let button;
      if (!this.optionDiv.childNodes[index]) {
        button = new Button(this.optionDiv);
        const label = new TextNode(button, option.label);
        button.childNodes = [label];
        this.optionDiv.addChild(button);
      } else {
        button = this.optionDiv.childNodes[index] as Button;
      }
      button.addStyleObj({
        height: '32px',
        borderRadius: '0',
        border: '1px solid #000',
      });
      button.addAttrObj({
        type: 'radio',
        value: option.value,
        checked: option.checked
      });
      if (option.checked) {
        button.propObj.styleObj.backgroundColor = '#00f';
        button.propObj.styleObj.color = '#fff';
        this.selectedOpt = button;
      } else {
        button.propObj.styleObj.backgroundColor = '#fff';
        button.propObj.styleObj.color = '#000';
      }
      // span.childNodes.push(label, inputRadio);
      // this.optionDiv.childNodes.push(button);
    });
  }
  //
  resetResultValue(value: string): void {
    console.log('resetResultValue value is ', value);
    this.resultValue = value;
    this.config.options.forEach(item => {
      item.checked = item.value === value;
    });
    console.log('this.config.options is ', this.config.options);
    this.setOptions(this.config.options);
    this.optionDiv.render();
  }
  initEvents(): void {
    this.optionDiv.childNodes.forEach((btn) => {
      this.events.push(
        fromEvent(btn.dom, 'click').subscribe(() => {
          if (this.selectedOpt) {
            this.selectedOpt.setStyleObj({
              backgroundColor: '#fff',
              color: '#000',
            });
            this.selectedOpt.setAttribute('checked', false);
          }
          this.selectedOpt = btn as Button;
          if (btn instanceof TextNode) return;
          if (btn instanceof TypeElement) {
            btn.setStyleObj({
              backgroundColor: '#00f',
              color: '#fff',
            });
            btn.setAttribute('checked', true);
            this.resultValue = btn.attrObj.value as string;
            this.reset(this.resultValue);
          } else {
          //   todo
          }

        })
      );
    });
  }
}
