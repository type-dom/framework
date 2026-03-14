import { TypeMap } from '../../../../core/abstracts/type-html/map/map.abstract';
import { MapProps } from '../../../../core/abstracts/type-html/map/map.interface';
import type { IMap } from './map.interface';

export class Map extends TypeMap implements IMap {
  className: 'Map';
  constructor(params: MapProps = {}) {
    super(params);
    this.className = 'Map';
  }
}
