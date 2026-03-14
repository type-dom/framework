import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeIFrame extends ITypeHtml {
  props: IFrameProps;
}

export interface IFrameProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['iframe'];
}
