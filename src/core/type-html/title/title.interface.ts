import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeTitle extends ITypeHtml {
  props: TypeTitleProps;
}

export interface TypeTitleProps extends HtmlProps {
  nodeName?: 'title';
  attrObj?: IntrinsicElementAttributes['title'];
}
