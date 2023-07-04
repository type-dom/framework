import { fromEvent, Subscription } from 'rxjs';
import { FormEditor } from '../../../../../../../form-editor';
import { PropertyTextarea } from '../../property-item/textarea/property-textarea.abstract';
import { FormProperty } from '../form-property';

// form loaded
export class FormLoadedProperty extends PropertyTextarea {
  className: 'FormLoadedProperty';
  onLoaded?: Subscription;

  constructor(public parent: FormProperty) {
    super('onLoaded', '请输入监听函数');
    this.className = 'FormLoadedProperty';
    this.addAttrName('form-loaded-property');
  }
  get loadedStr(): string {
    return this.propObj.attrObj['on-loaded'] as string;
  }
  set loadedStr(value: string) {
    this.setAttribute('on-loaded', value);
  }
  reset(value?: string): void {
    if (value !== undefined) { // 输入值的操作
      return;
    }
    if (this.loadedStr) {
      this.resetInputValue(this.loadedStr);
    } else {
      this.resetInputValue('');
    }
    // }
  }
  addFormLoaded(value: string): void {
    console.log('value is ', value);
    this.loadedStr = value;
    const body = document.querySelector('body');
    console.log('body is ', body);
    if (!body) throw Error('没有获取到body');
    if (value.trim()) { // 输入值的操作
      // todo body ----> page ???
      this.onLoaded = fromEvent(body, 'load').subscribe(() => {
        // eslint-disable-next-line no-new-func
        const fun = new Function('return ' + value)();
        console.log('fun is ', fun);
        fun(FormEditor.webDocument);
      });
      return;
    } else {
      if (this.onLoaded) this.onLoaded.unsubscribe();
    }
  }
  initEvents(): void {
    // super.initEvents();
    this.events.push(
      fromEvent(this.button.dom, 'click').subscribe(() => {
        console.log('this.btn.dom click . ');
        this.addFormLoaded(this.content.dom.value);
      })
    );
  }
}
