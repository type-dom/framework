import { TypeHtml } from '../type-html.abstract';
import { ITypeLegend, ITypeLegendConfig } from './legend.interface';

export abstract class TypeLegend extends TypeHtml implements ITypeLegend {
  props: ITypeLegendConfig;
  dom?: HTMLLegendElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'legend'
    })
  }
}
