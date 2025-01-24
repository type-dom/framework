import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';

export interface ITypeTrack extends ITypeHtml {
  props: ITypeTrackConfig;
}

export interface ITypeTrackConfig extends ITypeHtmlConfig {
  nodeName?: 'track';
}
