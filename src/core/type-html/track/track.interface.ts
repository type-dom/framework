import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeTrack extends ITypeHtml {
  props: TypeTrackProps;
}

export interface TypeTrackProps extends HtmlProps {
  nodeName?: 'track';
  attrObj?: IntrinsicElementAttributes['track'];
}
