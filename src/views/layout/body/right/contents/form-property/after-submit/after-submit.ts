import { fromEvent } from 'rxjs';
import { FormEditor } from '../../../../../../../form-editor';
import { PropertyTextarea } from '../../property-item/textarea/property-textarea.abstract';
import { FormProperty } from '../form-property';

// form after submit
export class AfterSubmitProperty extends PropertyTextarea {
  className: 'AfterSubmitProperty';
  constructor(public parent: FormProperty) {
    super('afterSubmit', '请输入监听函数');
    this.className = 'AfterSubmitProperty';
    this.addAttrName('after-submit-property');
  }
  get afterSubmitStr(): string {
    return FormEditor.webDocument.propObj.attrObj['after-submit'] as string;
  }
  set afterSubmitStr(value: string) {
    FormEditor.webDocument.setAttribute('after-submit', value);
  }
  reset(value?: string): void {
    if (value !== undefined) { // 输入值的操作
      return;
    }

    if (this.afterSubmitStr) {
      this.resetInputValue(this.afterSubmitStr);
    } else {
      this.resetInputValue('');
    }
    // }
  }
  addAfterSubmit(value: string): void {
    this.afterSubmitStr = value;
  }
  initEvents(): void {
    // super.initEvents();
    this.events.push(
      fromEvent(this.button.dom, 'click').subscribe(() => {
        this.addAfterSubmit(this.content.dom.value);
      })
    );
  }
}
