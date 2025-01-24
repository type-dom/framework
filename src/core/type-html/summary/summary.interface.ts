import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeSummary extends ITypeHtml {
  props: ITypeSummaryConfig;
}

export interface ITypeSummaryConfig extends ITypeHtmlConfig {
  nodeName: 'summary';
}
