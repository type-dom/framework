import type { ITypeHtml, HtmlProps } from '../type-html.interface';
import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute';

export interface ITypeAudio extends ITypeHtml {
  props: TypeAudioProps;
}

export interface TypeAudioProps extends HtmlProps {
  nodeName?: 'audio';
  attrObj?: IntrinsicElementAttributes['audio'];
}
