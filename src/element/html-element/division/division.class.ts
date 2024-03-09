import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeDiv } from '../../../type-element/type-html/div/div.abstract';
import { ITypeConfig } from '../../../config.interface';
import type { IDivision } from './division.interface';

export class Division extends TypeDiv implements IDivision {
  className: 'Division';
  parent?: TypeHtml;

  // declare parent?: TypeHtml
  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Division';
    this.setConfig(config);
  }
}
