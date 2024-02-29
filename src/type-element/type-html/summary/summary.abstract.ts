import { TypeHtml } from '../type-html.abstract';
import type { ITypeSummary } from './summary.interface';
export abstract class TypeSummary extends TypeHtml implements ITypeSummary {
  nodeName: 'summary';
  dom: HTMLElement;
  protected constructor() {
    super();
    this.nodeName = 'summary';
    this.dom = document.createElement(this.nodeName);
  }
}
