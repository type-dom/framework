import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeTextarea } from '../../../type-element/type-html/textarea/textarea.abstract';
import { XElement } from '../../../x-element/x-element.class';
import { ITextarea } from './textarea.interface';
export class Textarea extends TypeTextarea implements ITextarea {
  className: 'TextArea';
  value: string | number | boolean | undefined;
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'TextArea';
  }
  getValue(): string {
    return this.dom.value; // this.value
  }
  setValue(value: string | number | boolean): void {
    this.value = value;
    this.dom.value = String(value);
  }
}
