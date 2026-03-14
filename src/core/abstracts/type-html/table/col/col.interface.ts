import { IntrinsicElementAttributes } from '../../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeTableCol extends ITypeHtml {
  props: TableColProps;
}

export interface TableColProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['col'];
}
