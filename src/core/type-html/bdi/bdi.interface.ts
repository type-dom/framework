import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeBdi extends ITypeHtml {
  props: ITypeBdiConfig;
}

export interface ITypeBdiConfig extends ITypeHtmlConfig {
  nodeName?: 'bdi';
}
