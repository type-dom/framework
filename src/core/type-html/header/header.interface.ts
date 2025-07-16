import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeHeader extends ITypeHtml {
  props: TypeHeaderProps;
}

export interface TypeHeaderProps extends HtmlProps {
  nodeName?: 'header';
  attrObj?: IntrinsicElementAttributes['header'];
}
