import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeFigCaption extends ITypeHtml {
  props: ITypeFigCaptionConfig;
}

export interface ITypeFigCaptionConfig extends ITypeHtmlConfig {
  nodeName: 'figcaption';
}
