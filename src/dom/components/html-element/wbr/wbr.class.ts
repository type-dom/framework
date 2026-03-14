import { TypeWbr } from '../../../../core/abstracts/type-html/wbr/wbr.abstract';
import { WbrProps } from '../../../../core/abstracts/type-html/wbr/wbr.interface';
import type { IWbr } from './wbr.interface';

export class Wbr extends TypeWbr implements IWbr {
  className: 'Wbr';

  constructor(params: WbrProps = {}) {
    super(params);
    this.className = 'Wbr';
  }
}
