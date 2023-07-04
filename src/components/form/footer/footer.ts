import { TypeDiv } from '../../../../type-dom/type-element/type-html/div/div.abstract';
import { WebForm } from '../form';
import { SubmitButton } from './submit-button/submit-button';

export class FormFooter extends TypeDiv {
  className: 'FormFooter';
  childNodes: SubmitButton[];
  submitBtn: SubmitButton;

  constructor(public parent: WebForm) {
    super();
    this.className = 'FormFooter';
    this.propObj = {
      styleObj: {
        padding: '20px',
        paddingTop: '10px',
        textAlign: 'right',
        boxSizing: 'border-box',
      },
      attrObj: {
        name: 'form-foot'
      }
    };
    this.submitBtn = new SubmitButton(this);
    this.childNodes = [this.submitBtn];
  }
}
