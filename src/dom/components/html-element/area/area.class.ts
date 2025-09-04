import { TypeArea } from '../../../../core/components/type-html/area/area.abstract';
import { TypeAreaProps } from '../../../../core/components/type-html/area/area.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IArea } from './area.interface';

export class Area extends TypeArea implements IArea {
  className: 'Area';

  override isBasic = true;

  constructor(params: TypeAreaProps = {}) {
    super();
    this.className = 'Area';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
