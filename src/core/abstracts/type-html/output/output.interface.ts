import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeOutput extends ITypeHtml {
  props: OutputProps;
}

export interface OutputProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['output'];
}
