import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeData extends ITypeHtml {
  props: DataProps;
}

export interface DataProps extends HtmlProps {
  nodeName?: 'data';
  attrObj?: IntrinsicElementAttributes['data'];
}
