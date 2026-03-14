import { TypeLegend } from '../../../../core/abstracts/type-html/legend/legend.abstract';
import { LegendProps } from '../../../../core/abstracts/type-html/legend/legend.interface';
import type { ILegend } from './legend.interface';

export class Legend extends TypeLegend implements ILegend {
  className: 'Legend';
  constructor(params: LegendProps = {}) {
    super(params);
    this.className = 'Legend';
  }
}
