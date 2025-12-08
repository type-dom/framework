import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeRuby extends ITypeHtml {
  props: RubyProps;
}

export interface RubyProps extends HtmlProps {
  nodeName?: 'ruby';
  attrObj?: IntrinsicElementAttributes['ruby'];
}
