import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeIFrame extends ITypeHtml {
  props: TypeIFrameProps;
}

export interface TypeIFrameProps extends HtmlProps {
  nodeName?: 'iframe';
  attrObj?: IntrinsicElementAttributes['iframe'];
}
