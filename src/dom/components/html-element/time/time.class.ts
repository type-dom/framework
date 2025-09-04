import { TypeTime } from '../../../../core/components/type-html/time/time.abstract';
import { TypeTimeProps } from '../../../../core/components/type-html/time/time.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ITime } from './time.interface';

export class Time extends TypeTime implements ITime {
  className: 'Time';

  override isBasic = true;

  constructor(params: TypeTimeProps = {}) {
    super();
    this.className = 'Time';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
