import { TypeLegend } from '../../../../core/components/type-html/legend/legend.abstract';
import { LegendProps } from '../../../../core/components/type-html/legend/legend.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ILegend } from './legend.interface';

export class Legend extends TypeLegend implements ILegend {
  className: 'Legend';

  override isBasic = true;

  constructor(params: LegendProps = {}) {
    super(params);
    this.className = 'Legend';
    transformSlot(this, params.slot);
  }
}
