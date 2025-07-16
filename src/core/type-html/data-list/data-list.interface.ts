import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeDataList extends ITypeHtml {
  props: TypeDataListProps;
}

export interface TypeDataListProps extends HtmlProps {
  nodeName?: 'datalist';
  attrObj?: IntrinsicElementAttributes['datalist'];
}
