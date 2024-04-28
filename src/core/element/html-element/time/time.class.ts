import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeTime } from '../../../type-element/type-html/time/time.abstract';
import type { ITime } from './time.interface';

export class Time extends TypeTime implements ITime {
  className: 'Time';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Time';
    this.setConfig(config);
  }
}
