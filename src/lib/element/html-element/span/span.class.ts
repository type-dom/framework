import { TypeSpan } from '../../../type-element/type-html/span/span.abstract';
import { ITypeConfig } from '../../../config.interface';
import type { ISpan } from './span.interface';

export class Span extends TypeSpan implements ISpan {
  className: 'Span';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Span';
    this.setConfig(config);
  }
}
