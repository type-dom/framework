import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeTime } from '../../../core/type-html/time/time.abstract';
import type { ITime } from './time.interface';

export class Time extends TypeTime implements ITime {
  className: 'Time';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Time';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
