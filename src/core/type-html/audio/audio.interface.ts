import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeAudio extends ITypeHtml {
  props: ITypeAudioConfig;
}

export interface ITypeAudioConfig extends ITypeHtmlConfig {
  nodeName?: 'audio';
}
