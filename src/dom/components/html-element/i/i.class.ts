import { TypeI } from '../../../../core/abstracts/type-html/i/i.abstract';
import { IProps } from '../../../../core/abstracts/type-html/i/i.interface';
import type { II } from './i.interface';

export class I extends TypeI implements II {
  className: 'I';
  constructor(params: IProps = {}) {
    super(params);
    this.className = 'I';
  }
}
