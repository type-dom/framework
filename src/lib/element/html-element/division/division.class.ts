import { TypeDiv } from '../../../type-element/type-html/div/div.abstract';
import { ITypeConfig } from '../../../type-node/type-node.interface';
import type { IDivision } from './division.interface';

export class Division extends TypeDiv implements IDivision {
  className: 'Division';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Division';
    this.setConfig(config);
  }
}
