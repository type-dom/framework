import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeArea } from '../../type-html/area/area.abstract';
import type { IArea } from './area.interface';

export class Area extends TypeArea implements IArea {
  className: 'Area';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Area';
    this.setParams(params);
  }
}
