import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeProgress extends ITypeHtml {
  props: ITypeProgressConfig;
}

export interface ITypeProgressConfig extends ITypeHtmlConfig {
  nodeName: 'progress';
}
