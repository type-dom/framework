import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeCite extends ITypeHtml {
  props: CiteProps;
}

export interface CiteProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['cite'];
}
