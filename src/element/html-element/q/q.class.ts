import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeQ } from '../../../type-element/type-html/q/q.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IQ } from './q.interface';
export class Q extends TypeQ implements IQ {
  className: 'Q';
  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Q';
  }
}
