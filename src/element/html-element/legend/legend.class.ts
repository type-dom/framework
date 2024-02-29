import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeLegend } from '../../../type-element/type-html/legend/legend.abstract';
import { XElement } from '../../x-element/x-element.class';
import type { ILegend } from './legend.interface';
export class Legend extends TypeLegend implements ILegend {
  className: 'Legend';
  constructor(public parent?: TypeHtml | XElement) {
    super();
    this.className = 'Legend';
  }
}
