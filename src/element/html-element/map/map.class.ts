import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeMap } from '../../../type-element/type-html/map/map.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { IMap } from './map.interface';
export class Map extends TypeMap implements IMap {
  className: 'Map';
  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Map';
  }
}
