import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeTextarea } from '../../type-html/textarea/textarea.abstract';
import type { ITextarea } from './textarea.interface';

export class Textarea extends TypeTextarea implements ITextarea {
  className: 'TextArea';

  // value: string | number | boolean | undefined;

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'TextArea';
    this.setProps(params);
  }

  get value(): string {
    // 和 input保持一致
    return this.dom.value; // this.value
  }

  set value(value) {
    this.dom.value = value;
  }

  setValue(value: string | number | boolean): void {
    // this.value = value;
    this.dom.value = String(value);
  }
}
