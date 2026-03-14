import { TypeQ } from '../../../../core/abstracts/type-html/q/q.abstract';
import { QProps } from '../../../../core/abstracts/type-html/q/q.interface';
import type { IQ } from './q.interface';

export class Q extends TypeQ implements IQ {
  className: 'Q';
  constructor(params: QProps = {}) {
    super(params);
    this.className = 'Q';
  }
}
