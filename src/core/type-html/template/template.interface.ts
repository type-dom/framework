import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeTemplate extends ITypeHtml {
  props: ITypeTemplateConfig;
}

export interface ITypeTemplateConfig extends ITypeHtmlConfig {
  nodeName: 'template';
}
