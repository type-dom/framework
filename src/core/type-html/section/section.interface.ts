import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeSection extends ITypeHtml {
  props: ITypeSectionConfig;
}

export interface ITypeSectionConfig extends ITypeHtmlConfig {
  nodeName?: 'section';
}
