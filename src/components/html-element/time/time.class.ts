import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeTime } from '../../../core/type-html/time/time.abstract';
import type { ITime } from './time.interface';

export class Time extends TypeTime implements ITime {
  className: 'Time';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Time';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
