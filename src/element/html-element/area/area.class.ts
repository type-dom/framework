import { ITypeConfig } from '../../../config.interface';
import { TypeArea } from '../../../type-element/type-html/area/area.abstract';
import type { IArea } from './area.interface';

export class Area extends TypeArea implements IArea {
  className: 'Area';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Area';
    this.setConfig(config);
  }
}
