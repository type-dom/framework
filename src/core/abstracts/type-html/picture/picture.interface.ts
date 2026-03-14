import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypePicture extends ITypeHtml {
  props: PictureProps;
}

export interface PictureProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['picture'];
}
