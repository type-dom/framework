import { TypeHr } from '../../../../core/abstracts/type-html/hr/hr.abstract';
import { HrProps } from '../../../../core/abstracts/type-html/hr/hr.interface';
import type { IHr } from './hr.interface';

export class Hr extends TypeHr implements IHr {
  className: 'Hr';
  constructor(params: HrProps = {}) {
    super(params);
    this.className = 'Hr';
  }
}
