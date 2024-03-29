import { TypeHtml } from '../type-html.abstract';
import type { ITypeMap } from './map.interface';

export abstract class TypeMap extends TypeHtml implements ITypeMap {
  nodeName: 'map';
  dom: HTMLMapElement;

  protected constructor() {
    super();
    this.nodeName = 'map';
    this.dom = document.createElement(this.nodeName);
  }
}
