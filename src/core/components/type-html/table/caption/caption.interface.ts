import { IntrinsicElementAttributes } from '../../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeTableCaption extends ITypeHtml {
  props: TypeTableCaptionProps;
}

export interface TypeTableCaptionProps extends HtmlProps {
  nodeName?: 'caption';
  attrObj?: IntrinsicElementAttributes['caption'];
}
