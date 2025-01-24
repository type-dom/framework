import type { ITypeHtml, ITypeHtmlConfig } from '../../type-html.interface';

export interface ITypeTableCaption extends ITypeHtml {
  props: ITypeTableCaptionConfig;
}

export interface ITypeTableCaptionConfig extends ITypeHtmlConfig {
  nodeName?: 'caption';
}
