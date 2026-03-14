import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeDfn extends ITypeHtml {
  props: DfnProps;
}

export interface DfnProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['dfn'];
}
