import { TypeArea } from '../../../../core/components/type-html/area/area.abstract';
import { AreaProps } from '../../../../core/components/type-html/area/area.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IArea } from './area.interface';

export class Area extends TypeArea implements IArea {
  className: 'Area';

  override isBasic = true;

  constructor(params: AreaProps = {}) {
    super(params);
    this.className = 'Area';
    transformSlot(this, params.slot);
  }
}
