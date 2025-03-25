import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeArea } from '../../../core/type-html/area/area.abstract';
import type { IArea } from './area.interface';

export class Area extends TypeArea implements IArea {
  className: 'Area';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Area';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
