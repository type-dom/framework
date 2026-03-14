import { TypeStrong } from '../../../../core/abstracts/type-html/strong/strong.abstract';
import { StrongProps } from '../../../../core/abstracts/type-html/strong/strong.interface';
import type { IStrong } from './strong.interface';

export class Strong extends TypeStrong implements IStrong {
  className: 'Strong';

  constructor(params: StrongProps = {}) {
    super(params);
    this.className = 'Strong';
  }
}
