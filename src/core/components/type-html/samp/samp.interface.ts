import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSamp extends ITypeHtml {
  props: SampProps;
}

export interface SampProps extends HtmlProps {
  nodeName?: 'samp';
  attrObj?: IntrinsicElementAttributes['samp'];
}
