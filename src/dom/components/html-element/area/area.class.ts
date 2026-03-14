import { TypeArea } from '../../../../core/abstracts/type-html/area/area.abstract';
import { AreaProps } from '../../../../core/abstracts/type-html/area/area.interface';
import type { IArea } from './area.interface';

export class Area extends TypeArea implements IArea {
  className: 'Area';

  constructor(params: AreaProps = {}) {
    super(params);
    this.className = 'Area';
  }
}
