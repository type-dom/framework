import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

/**
 * Horizontal Rule
 */
export interface ITypeHr extends ITypeHtml {
  props: ITypeHrConfig;
}

export interface ITypeHrConfig extends ITypeHtmlConfig {
  nodeName?: 'hr';
}
