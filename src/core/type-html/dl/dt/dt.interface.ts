import type { ITypeHtml, ITypeHtmlConfig } from '../../type-html.interface';

export interface ITypeDT extends ITypeHtml {
  props: ITypeDTConfig;
}

export interface ITypeDTConfig extends ITypeHtmlConfig {
  nodeName?: 'dt';
}
