import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeBase extends ITypeHtml {
  props: BaseProps;
}

export interface BaseProps extends HtmlProps {
  nodeName?: 'base';
  attrObj?: IntrinsicElementAttributes['base'];
}
