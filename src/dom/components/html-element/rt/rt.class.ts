import { TypeRt } from '../../../../core/abstracts/type-html/rt/rt.abstract';
import { RtProps } from '../../../../core/abstracts/type-html/rt/rt.interface';
import type { IRt } from './rt.interface';

export class Rt extends TypeRt implements IRt {
  className: 'Rt';
  constructor(params: RtProps = {}) {
    super(params);
    this.className = 'Rt';
  }
}
