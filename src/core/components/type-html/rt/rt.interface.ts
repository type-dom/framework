import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeRt extends ITypeHtml {
  props: TypeRtProps;
}

export interface TypeRtProps extends HtmlProps {
  nodeName?: 'rt';
  attrObj?: IntrinsicElementAttributes['rt'];
}
