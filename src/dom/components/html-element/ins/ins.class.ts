import { TypeIns } from '../../../../core/abstracts/type-html/ins/ins.abstract';
import { InsProps } from '../../../../core/abstracts/type-html/ins/ins.interface';
import type { IIns } from './ins.interface';

export class Ins extends TypeIns implements IIns {
  className: 'Ins';
  constructor(params: InsProps = {}) {
    super(params);
    this.className = 'Ins';
  }
}
