import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeSamp extends ITypeHtml {
  props: ITypeSampConfig;
}

export interface ITypeSampConfig extends ITypeHtmlConfig {
  nodeName?: 'samp';
}
