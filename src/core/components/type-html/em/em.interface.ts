import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeEm extends ITypeHtml {
  props: EmProps;
}

export interface EmProps extends HtmlProps {
  nodeName?: 'em';
  attrObj?: IntrinsicElementAttributes['em'];
}
