import { IntrinsicElementAttributes } from '../../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeTableHead extends ITypeHtml {
  props: TypeTableHeadProps;
}

export interface TypeTableHeadProps extends HtmlProps {
  nodeName?: 'thead';
  attrObj?: IntrinsicElementAttributes['thead'];
}
