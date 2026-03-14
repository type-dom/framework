import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeTrack extends ITypeHtml {
  props: TrackProps;
}

export interface TrackProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['track'];
}
