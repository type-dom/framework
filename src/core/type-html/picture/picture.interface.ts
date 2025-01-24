import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypePicture extends ITypeHtml {
  props: ITypePictureConfig;
}

export interface ITypePictureConfig extends ITypeHtmlConfig {
  nodeName?: 'picture';
}
