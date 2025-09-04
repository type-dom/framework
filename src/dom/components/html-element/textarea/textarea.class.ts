import { IPrimitive } from '@type-dom/utils';
import { TypeTextarea } from '../../../../core/components/type-html/textarea/textarea.abstract';
import { TypeTextareaProps } from '../../../../core/components/type-html/textarea/textarea.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ITextarea } from './textarea.interface';

export class Textarea extends TypeTextarea implements ITextarea {
  className: 'TextArea';

  // value: string | number | boolean | undefined;

  override isBasic = true;

  constructor(params: TypeTextareaProps = {}) {
    super();
    this.className = 'TextArea';
    transformSlot(this, params.slot);
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
