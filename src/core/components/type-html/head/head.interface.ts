import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeHead extends ITypeHtml {
  props: TypeHeadProps;
}

/**
 * <h1-h6> 标题信息
 */
export interface TypeHeadProps extends HtmlProps {
  nodeName?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  attrObj?: IntrinsicElementAttributes['h1'];
}
