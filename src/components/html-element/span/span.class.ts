import { TypeSpan } from '../../type-html/span/span.abstract';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import type { ISpan } from './span.interface';

export class Span extends TypeSpan implements ISpan {
  className: 'Span';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Span';
    this.setProps(params);
  }
}
