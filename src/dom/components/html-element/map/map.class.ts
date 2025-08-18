import { TypeMap } from '../../../../core/components/type-html/map/map.abstract';
import { TypeMapProps } from '../../../../core/components/type-html/map/map.interface';
import type { IMap } from './map.interface';

export class Map extends TypeMap implements IMap {
  className: 'Map';

  override isBasic = true;

  constructor(params: TypeMapProps = {}) {
    super();
    this.className = 'Map';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
