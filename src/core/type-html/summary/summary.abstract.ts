import { TypeHtml } from '../type-html.abstract';
import { ITypeSummary, ITypeSummaryConfig } from './summary.interface';

export abstract class TypeSummary extends TypeHtml implements ITypeSummary {
  props: ITypeSummaryConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'summary'
    })
  }
}
