import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeBdi extends ITypeHtml {
  props: TypeBdiProps;
}

export interface TypeBdiProps extends HtmlProps {
  nodeName?: 'bdi';
  attrObj?: IntrinsicElementAttributes['bdi'];
}
