import { TypeMap } from '../../../../core/components/type-html/map/map.abstract';
import { MapProps } from '../../../../core/components/type-html/map/map.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IMap } from './map.interface';

export class Map extends TypeMap implements IMap {
  className: 'Map';

  override isBasic = true;

  constructor(params: MapProps = {}) {
    super(params);
    this.className = 'Map';
    transformSlot(this, params.slot);
  }
}
