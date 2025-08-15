import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeBase extends ITypeHtml {
  props: TypeBaseProps;
}

export interface TypeBaseProps extends HtmlProps {
  nodeName?: 'base';
  attrObj?: IntrinsicElementAttributes['base'];
}
