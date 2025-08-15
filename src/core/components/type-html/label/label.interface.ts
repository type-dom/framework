import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeLabel extends ITypeHtml {
  props: TypeLabelProps;
}

export interface TypeLabelProps extends HtmlProps {
  nodeName?: 'label';
  attrObj?: IntrinsicElementAttributes['label'];
}
