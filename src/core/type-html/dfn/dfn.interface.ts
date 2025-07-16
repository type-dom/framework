import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeDfn extends ITypeHtml {
  props: TypeDfnProps;
}

export interface TypeDfnProps extends HtmlProps {
  nodeName?: 'dfn';
  attrObj?: IntrinsicElementAttributes['dfn'];
}
