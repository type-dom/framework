import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

/**
 * Horizontal Rule
 */
export interface ITypeHr extends ITypeHtml {
  props: HrProps;
}

export interface HrProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['hr'];
}
