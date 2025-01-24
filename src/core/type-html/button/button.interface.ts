import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeButton extends ITypeHtml {
  props: ITypeButtonConfig;
}

export interface ITypeButtonConfig extends ITypeHtmlConfig {
  nodeName?: 'button';
}
