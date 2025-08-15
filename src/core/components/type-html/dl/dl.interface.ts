import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeDL extends ITypeHtml {
  props: TypeDLProps;
  // childNodes: ITypeLI[]
}

export interface TypeDLProps extends HtmlProps {
  nodeName?: 'dl';
  attrObj?: IntrinsicElementAttributes['dl'];
}
