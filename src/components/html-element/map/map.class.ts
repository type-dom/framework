import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeMap } from '../../type-html/map/map.abstract';
import type { IMap } from './map.interface';

export class Map extends TypeMap implements IMap {
  className: 'Map';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Map';
    this.setParams(params);
  }
}
