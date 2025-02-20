import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeTextarea } from '../../../core/type-html/textarea/textarea.abstract';
import type { ITextarea } from './textarea.interface';
import { IPrimitive } from '../../../interface';

export class Textarea extends TypeTextarea implements ITextarea {
  className: 'TextArea';

  // value: string | number | boolean | undefined;

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'TextArea';
    this.slotChild(params.slot);
    this.useParams(params);
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
