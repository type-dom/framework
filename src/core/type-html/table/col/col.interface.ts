import type { ITypeHtml, ITypeHtmlConfig } from '../../type-html.interface';

export interface ITypeTableCol extends ITypeHtml {
  props: ITypeTableColConfig;
}

export interface ITypeTableColConfig extends ITypeHtmlConfig {
  nodeName?: 'col';
}
