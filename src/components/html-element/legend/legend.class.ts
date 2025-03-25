import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeLegend } from '../../../core/type-html/legend/legend.abstract';
import type { ILegend } from './legend.interface';

export class Legend extends TypeLegend implements ILegend {
  className: 'Legend';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Legend';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
