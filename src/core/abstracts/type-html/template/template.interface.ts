import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeTemplate extends ITypeHtml {
  props: TemplateProps;
}

export interface TemplateProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['template'];
}
