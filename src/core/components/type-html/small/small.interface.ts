import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSmall extends ITypeHtml {
  props: SmallProps;
}

export interface SmallProps extends HtmlProps {
  nodeName?: 'small';
  attrObj?: IntrinsicElementAttributes['small'];
}
