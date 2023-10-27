import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeTime } from '../../../type-element/type-html/time/time.abstract';
import { XElement } from '../../x-element/x-element.class';
import { ITime } from './time.interface';
export class Time extends TypeTime implements ITime {
  className: 'Time';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Time';
  }
}
