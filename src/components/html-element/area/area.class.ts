import { TypeArea } from '../../../core/type-html/area/area.abstract';
import { TypeAreaProps } from '../../../core/type-html/area/area.interface';
import type { IArea } from './area.interface';

export class Area extends TypeArea implements IArea {
  className: 'Area';

  override isBasic = true;

  constructor(params: TypeAreaProps = {}) {
    super();
    this.className = 'Area';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
