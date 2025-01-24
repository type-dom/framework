import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeLegend extends ITypeHtml {
  props: ITypeLegendConfig;
}

export interface ITypeLegendConfig extends ITypeHtmlConfig {
  nodeName?: 'legend';
}
