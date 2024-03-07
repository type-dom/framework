import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeArea } from '../../../type-element/type-html/area/area.abstract';
import type { IArea } from './area.interface';

export class Area extends TypeArea implements IArea {
  className: 'Area';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Area';
  }
}
