import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeFigure extends ITypeHtml {
  props: ITypeFigureConfig;
}

export interface ITypeFigureConfig extends ITypeHtmlConfig {
  nodeName?: 'figure';
}
