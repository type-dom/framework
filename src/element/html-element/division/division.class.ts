import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeDiv } from '../../../type-element/type-html/div/div.abstract';
import { IDivision } from './division.interface';
import { XElement } from '../../x-element/x-element.class';
export class Division extends TypeDiv implements IDivision {
  className: 'Division';
  parent?: TypeHtml | XElement;
  constructor() {
    super();
    this.className = 'Division';
  }
}
