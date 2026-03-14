import { IntrinsicElementAttributes } from '../../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeTableCaption extends ITypeHtml {
  props: TableCaptionProps;
}

export interface TableCaptionProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['caption'];
}
