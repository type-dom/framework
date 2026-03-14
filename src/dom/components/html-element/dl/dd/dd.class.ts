import { TypeDD } from '../../../../../core/abstracts/type-html/dl/dd/dd.abstract';
import { DDProps } from '../../../../../core/abstracts/type-html/dl/dd/dd.interface';
import type { IDD } from './dd.interface';

export class DD extends TypeDD implements IDD {
  className: 'DD';

  constructor(params: DDProps = {}) {
    super(params);
    this.className = 'DD';
  }
}
