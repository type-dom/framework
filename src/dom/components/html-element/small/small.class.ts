import { TypeSmall } from '../../../../core/abstracts/type-html/small/small.abstract';
import { SmallProps } from '../../../../core/abstracts/type-html/small/small.interface';
import type { ISmall } from './small.interface';

export class Small extends TypeSmall implements ISmall {
  className: 'Small';

  constructor(params: SmallProps = {}) {
    super(params);
    this.className = 'Small';
  }
}
