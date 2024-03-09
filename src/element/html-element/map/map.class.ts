import { ITypeConfig } from '../../../config.interface';
import { TypeMap } from '../../../type-element/type-html/map/map.abstract';
import type { IMap } from './map.interface';

export class Map extends TypeMap implements IMap {
  className: 'Map';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Map';
    this.setConfig(config);
  }
}
