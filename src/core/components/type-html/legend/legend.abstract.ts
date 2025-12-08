import { TypeHtml } from '../type-html.abstract';
import { ITypeLegend, LegendProps } from './legend.interface';

export abstract class TypeLegend<Props extends LegendProps = LegendProps> extends TypeHtml<Props> implements ITypeLegend {
  dom: HTMLLegendElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'legend'
    } as Props);
    this.dom = document.createElement('legend');
  }
}
