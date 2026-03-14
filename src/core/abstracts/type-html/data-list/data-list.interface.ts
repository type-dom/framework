import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeDataList extends ITypeHtml {
  props: DataListProps;
}

export interface DataListProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['datalist'];
}
