import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSup extends ITypeHtml {
  props: TypeSupProps;
}

export interface TypeSupProps extends HtmlProps {
  nodeName?: 'sup';
  attrObj?: IntrinsicElementAttributes['sup'];
}
