import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeTextarea extends ITypeHtml {
  props: ITypeTextareaConfig;
}

export interface ITypeTextareaConfig extends ITypeHtmlConfig {
  nodeName: 'textarea';
}
