import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeCode extends ITypeHtml {
  props: CodeProps;
}

export interface CodeProps extends HtmlProps {
  nodeName?: 'code';
  attrObj?: IntrinsicElementAttributes['code'];
}
