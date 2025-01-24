import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeCanvas extends ITypeHtml {
  props: ITypeCanvasConfig;
}

export interface ITypeCanvasConfig extends ITypeHtmlConfig {
  nodeName?: 'canvas';
}
