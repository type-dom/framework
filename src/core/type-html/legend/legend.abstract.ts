import { TypeHtml } from '../type-html.abstract';
import { ITypeLegend, TypeLegendProps } from './legend.interface';

export abstract class TypeLegend extends TypeHtml implements ITypeLegend {
  props: TypeLegendProps;
  dom?: HTMLLegendElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'legend'
    })
  }
}
