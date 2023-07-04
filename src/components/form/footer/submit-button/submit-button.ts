import { fromEvent, Observable } from 'rxjs';
import { FormEditor } from '../../../../form-editor';
import { TypeButton } from '../../../../../type-dom/type-element/type-html/button/button.abstract';
import { buttonStyle } from '../../../../../type-dom/type-element/type-html/button/button.const';
import { TextNode } from '../../../../../type-dom/text-node/text-node.class';
import { FormFooter } from '../footer';
export class SubmitButton extends TypeButton {
  className: 'SubmitButton';
  textNode: TextNode;
  submitObservable: Observable<Event>;
  constructor(public parent: FormFooter) {
    super();
    this.className = 'SubmitButton';
    this.propObj = {
      attrObj: {
        type: 'submit'
      },
      styleObj: buttonStyle,
    };
    this.textNode = new TextNode(this, '提交');
    this.submitObservable = fromEvent(this.dom, 'click');
    this.initEvents();
  }
  get beforeSubmitStr(): string {
    return FormEditor.webDocument.attrObj['before-submit'] as string;
  }
  get afterSubmitStr(): string {
    return FormEditor.webDocument.attrObj['after-submit'] as string;
  }
  initEvents(): void {
    this.events.push(
      this.submitObservable.subscribe(() => {
        console.log('submit . ');
        console.log('AppRoot.exampleData is ', FormEditor.formData);
        this.submit();
      })
    );
  }
  submit(): void {
    //  todo 组装需要提交的数据
    if (this.beforeSubmitStr) {
      this.createFun(this.beforeSubmitStr);
    }
    // todo submit方法 是否也要设计表单时确定 ？？？
    console.log('AppRoot.webDocument', FormEditor.webDocument);
    if (this.afterSubmitStr) {
      this.createFun(this.afterSubmitStr);
    }
  }
  createFun(value: string | number | boolean): void {
    // eslint-disable-next-line no-new-func
    const fun = new Function('return ' + value);
    fun(FormEditor.webDocument);
  }
}
