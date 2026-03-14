import { TypeTime } from '../../../../core/abstracts/type-html/time/time.abstract';
import { TimeProps } from '../../../../core/abstracts/type-html/time/time.interface';
import type { ITime } from './time.interface';

export class Time extends TypeTime implements ITime {
  className: 'Time';

  constructor(params: TimeProps = {}) {
    super(params);
    this.className = 'Time';
  }
}
