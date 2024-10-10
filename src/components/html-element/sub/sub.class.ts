import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeSub } from '../../../core/type-html/sub/sub.abstract';
import type { ISub } from './sub.interface';

export class Sub extends TypeSub implements ISub {
  className: 'Sub';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Sub';
    this.useParams(params);
  }
}
