import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeImg extends ITypeHtml {
  props: ImgProps;
  childNodes: [];
}

export interface ImgProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['img'];
}
