import { IPrimitive } from '@type-dom/utils';
import { TypeTextarea } from '../../../../core/abstracts/type-html/textarea/textarea.abstract';
import { TextareaProps } from '../../../../core/abstracts/type-html/textarea/textarea.interface';
import type { ITextarea } from './textarea.interface';

export class Textarea extends TypeTextarea implements ITextarea {
  className: 'TextArea';

  // value: string | number | boolean | undefined;
  constructor(params: TextareaProps = {}) {
    super(params);
    this.className = 'TextArea';
  }

  get value(): string | undefined {
    // 和 input保持一致
    return this.dom?.value; // this.value
  }

  set value(value) {
    if (this.dom) {
      this.dom.value = value || '';
    }
  }

  setValue(value?: IPrimitive): void {
    // this.value = value;
    if (this.dom) {
      this.dom.value = String(value);
    }
  }
}
