import { ITypeConfig } from '../../../config.interface';
import { TypeSmall } from '../../../type-element/type-html/small/small.abstract';
import type { ISmall } from './small.interface';

export class Small extends TypeSmall implements ISmall {
  className: 'Small';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Small';
    this.setConfig(config);
  }
}
