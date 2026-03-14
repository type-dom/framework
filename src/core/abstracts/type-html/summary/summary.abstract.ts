import { TypeHtml } from '../type-html.abstract';
import { ITypeSummary, SummaryProps } from './summary.interface';

export abstract class TypeSummary<Props extends SummaryProps = SummaryProps>
  extends TypeHtml<Props> implements ITypeSummary {
  dom: HTMLElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.dom = document.createElement('summary');
  }
}
