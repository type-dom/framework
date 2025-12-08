import { TypeTime } from '../../../../core/components/type-html/time/time.abstract';
import { TimeProps } from '../../../../core/components/type-html/time/time.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ITime } from './time.interface';

export class Time extends TypeTime implements ITime {
  className: 'Time';
  override isBasic = true;

  constructor(params: TimeProps = {}) {
    super(params);
    this.className = 'Time';
    transformSlot(this, params.slot);
  }
}
