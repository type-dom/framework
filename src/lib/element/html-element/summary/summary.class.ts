import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeSummary } from '../../../type-element/type-html/summary/summary.abstract';
import type { ISummary } from './summary.interface';

export class Summary extends TypeSummary implements ISummary {
  className: 'Summary';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Summary';
    this.setConfig(config);
  }
}
