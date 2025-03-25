import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeMap } from '../../../core/type-html/map/map.abstract';
import type { IMap } from './map.interface';

export class Map extends TypeMap implements IMap {
  className: 'Map';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Map';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
