import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeSummary } from '../../type-html/summary/summary.abstract';
import type { ISummary } from './summary.interface';

export class Summary extends TypeSummary implements ISummary {
  className: 'Summary';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Summary';
    this.setProps(params);
  }
}
