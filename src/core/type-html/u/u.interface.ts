import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeU extends ITypeHtml {
  props: TypeUProps;
}

export interface TypeUProps extends HtmlProps {
  nodeName?: 'u';
  attrObj?: IntrinsicElementAttributes['u'];
}
