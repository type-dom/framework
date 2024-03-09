import { TypeDiv } from '../../../type-element/type-html/div/div.abstract';
import { ITypeConfig } from '../../../config.interface';
import type { IDivision } from './division.interface';

export class Division extends TypeDiv implements IDivision {
  className: 'Division';

  // declare parent?: TypeHtml
  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Division';
    this.setConfig(config);
  }
}
