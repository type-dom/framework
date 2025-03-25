import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeBdi } from '../../../core/type-html/bdi/bdi.abstract';
import type { IBdi } from './bdi.interface';

export class Bdi extends TypeBdi implements IBdi {
  className: 'Bdi';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Bdi';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
