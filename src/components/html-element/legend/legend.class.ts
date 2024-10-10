import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeLegend } from '../../../core/type-html/legend/legend.abstract';
import type { ILegend } from './legend.interface';

export class Legend extends TypeLegend implements ILegend {
  className: 'Legend';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Legend';
    this.useParams(params);
  }
}
