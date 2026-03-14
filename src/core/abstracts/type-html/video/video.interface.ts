import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeVideo extends ITypeHtml {
  props: VideoProps;
}

export interface VideoProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['video'];
}
