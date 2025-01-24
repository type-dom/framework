import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeHead extends ITypeHtml {
  props: ITypeHeadConfig;
}

/**
 * <h1-h6> 标题信息
 */
export interface ITypeHeadConfig extends ITypeHtmlConfig {
  nodeName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
