import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeImg extends ITypeHtml {
  props: TypeImgProps;
  childNodes: [];
}

export interface TypeImgProps extends HtmlProps {
  nodeName?: 'img';
  attrObj?: IntrinsicElementAttributes['img'];
}
