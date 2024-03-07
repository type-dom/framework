import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeLegend } from '../../../type-element/type-html/legend/legend.abstract';
import type { ILegend } from './legend.interface';

export class Legend extends TypeLegend implements ILegend {
  className: 'Legend';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'Legend';
  }
}
