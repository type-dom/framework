import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeRuby extends ITypeHtml {
  props: TypeRubyProps;
}

export interface TypeRubyProps extends HtmlProps {
  nodeName?: 'ruby';
  attrObj?: IntrinsicElementAttributes['ruby'];
}
