import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeLabel extends ITypeHtml {
  props: ITypeLabelConfig;
}

export interface ITypeLabelConfig extends ITypeHtmlConfig {
  nodeName?: 'label';
}
