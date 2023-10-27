import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeDiv } from '../../../type-element/type-html/div/div.abstract';
import { XElement } from '../../x-element/x-element.class';
import { IDivision } from './division.interface';
export class Division extends TypeDiv implements IDivision {
  className: 'Division';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Division';
  }
}
