import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeLI extends ITypeHtml {
  props: TypeLIProps;
}

export interface TypeLIProps extends HtmlProps {
  nodeName?: 'li';
  attrObj?: IntrinsicElementAttributes['li'];
}
