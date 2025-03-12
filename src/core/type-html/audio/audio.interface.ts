import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeAudio extends ITypeHtml {
  props: TypeAudioProps;
}

export interface TypeAudioProps extends HtmlProps {
  nodeName?: 'audio';
}
