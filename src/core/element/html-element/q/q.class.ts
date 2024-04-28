import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeQ } from '../../../type-element/type-html/q/q.abstract';
import type { IQ } from './q.interface';

export class Q extends TypeQ implements IQ {
  className: 'Q';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Q';
    this.setConfig(config);
  }
}
