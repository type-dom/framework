import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeDel extends ITypeHtml {
  props: DelProps;
}

export interface DelProps extends HtmlProps {
  nodeName?: 'del';
  attrObj?: IntrinsicElementAttributes['del'];
}
