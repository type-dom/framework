import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeIFrame extends ITypeHtml {
  props: ITypeIFrameConfig;
}

export interface ITypeIFrameConfig extends ITypeHtmlConfig {
  nodeName?: 'iframe';
}
