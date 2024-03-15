import { ITypeConfig } from '../../../config.interface';
import { TypeTextarea } from '../../../type-element/type-html/textarea/textarea.abstract';
import type { ITextarea } from './textarea.interface';

export class Textarea extends TypeTextarea implements ITextarea {
  className: 'TextArea';
  value: string | number | boolean | undefined;

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'TextArea';
    this.setConfig(config);
  }

  getValue(): string {
    return this.dom.value; // this.value
  }

  setValue(value: string | number | boolean): void {
    this.value = value;
    this.dom.value = String(value);
  }
}
