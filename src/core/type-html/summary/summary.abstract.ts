import { TypeHtml } from '../type-html.abstract';
import { ITypeSummary, TypeSummaryProps } from './summary.interface';

export abstract class TypeSummary extends TypeHtml implements ITypeSummary {
  props: TypeSummaryProps;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'summary'
    })
  }
}
