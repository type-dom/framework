import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypePicture extends ITypeHtml {
  props: TypePictureProps;
}

export interface TypePictureProps extends HtmlProps {
  nodeName?: 'picture';
  attrObj?: IntrinsicElementAttributes['picture'];
}
