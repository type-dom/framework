import { TypeHtml } from '../type-html.abstract';
import type { ITypeLegend } from './legend.interface';

export abstract class TypeLegend extends TypeHtml implements ITypeLegend {
  nodeName: 'legend';
  dom: HTMLLegendElement;

  protected constructor() {
    super();
    this.nodeName = 'legend';
    this.dom = document.createElement(this.nodeName);
  }
}
