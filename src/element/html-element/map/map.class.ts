import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeMap } from '../../../type-element/type-html/map/map.abstract';
import type { IMap } from './map.interface';

export class Map extends TypeMap implements IMap {
  className: 'Map';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Map';
  }
}
