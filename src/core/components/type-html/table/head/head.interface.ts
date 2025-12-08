import { IntrinsicElementAttributes } from '../../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeTableHead extends ITypeHtml {
  props: TableHeadProps;
}

export interface TableHeadProps extends HtmlProps {
  nodeName?: 'thead';
  attrObj?: IntrinsicElementAttributes['thead'];
}
