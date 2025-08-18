import { TypeLegend } from '../../../../core/components/type-html/legend/legend.abstract';
import { TypeLegendProps } from '../../../../core/components/type-html/legend/legend.interface';
import type { ILegend } from './legend.interface';

export class Legend extends TypeLegend implements ILegend {
  className: 'Legend';

  override isBasic = true;

  constructor(params: TypeLegendProps = {}) {
    super();
    this.className = 'Legend';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
