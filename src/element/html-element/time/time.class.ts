import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeTime } from '../../../type-element/type-html/time/time.abstract';
import type { ITime } from './time.interface';

export class Time extends TypeTime implements ITime {
  className: 'Time';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Time';
  }
}
