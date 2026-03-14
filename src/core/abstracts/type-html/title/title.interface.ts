import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeTitle extends ITypeHtml {
  props: TitleProps;
}

export interface TitleProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['title'];
}
