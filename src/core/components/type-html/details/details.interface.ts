import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeDetails extends ITypeHtml {
  props: TypeDetailsProps;
}

export interface TypeDetailsProps extends HtmlProps {
  nodeName?: 'details';
  attrObj?: IntrinsicElementAttributes['details'];
}
