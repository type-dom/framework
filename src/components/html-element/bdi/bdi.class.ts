import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeBdi } from '../../../core/type-html/bdi/bdi.abstract';
import type { IBdi } from './bdi.interface';

export class Bdi extends TypeBdi implements IBdi {
  className: 'Bdi';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Bdi';
    this.useParams(params);
  }
}
