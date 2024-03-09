import { ITypeConfig } from '../../../config.interface';
import { TypeLegend } from '../../../type-element/type-html/legend/legend.abstract';
import type { ILegend } from './legend.interface';

export class Legend extends TypeLegend implements ILegend {
  className: 'Legend';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Legend';
    this.setConfig(config);
  }
}
