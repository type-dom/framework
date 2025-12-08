import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeOL extends ITypeHtml {
  props: OLProps
}

export interface OLProps extends HtmlProps {
  nodeName?: 'ol';
  attrObj?: IntrinsicElementAttributes['ol'];
}
