import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSmall extends ITypeHtml {
  props: TypeSmallProps;
}

export interface TypeSmallProps extends HtmlProps {
  nodeName?: 'small';
  attrObj?: IntrinsicElementAttributes['small'];
}
