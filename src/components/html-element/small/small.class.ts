import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeSmall } from '../../../core/type-html/small/small.abstract';
import type { ISmall } from './small.interface';

export class Small extends TypeSmall implements ISmall {
  className: 'Small';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Small';
    this.useParams(params);
  }
}
