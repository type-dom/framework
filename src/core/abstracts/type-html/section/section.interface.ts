import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSection extends ITypeHtml {
  props: SectionProps;
}

export interface SectionProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['section'];
}
