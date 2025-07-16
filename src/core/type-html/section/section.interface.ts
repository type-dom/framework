import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSection extends ITypeHtml {
  props: TypeSectionProps;
}

export interface TypeSectionProps extends HtmlProps {
  nodeName?: 'section';
  attrObj?: IntrinsicElementAttributes['section'];
}
