import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeRp extends ITypeHtml {
  props: RpProps;
}

export interface RpProps extends HtmlProps {
  nodeName?: 'rp';
  attrObj?: IntrinsicElementAttributes['rp'];
}
