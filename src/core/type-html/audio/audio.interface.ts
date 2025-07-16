import type { ITypeHtml, HtmlProps } from '../type-html.interface';
import { IntrinsicElementAttributes } from '../../attribute';

export interface ITypeAudio extends ITypeHtml {
  props: TypeAudioProps;
}

export interface TypeAudioProps extends HtmlProps {
  nodeName?: 'audio';
  attrObj?: IntrinsicElementAttributes['audio'];
}
