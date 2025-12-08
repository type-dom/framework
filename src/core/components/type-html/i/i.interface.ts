import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeI extends ITypeHtml {
  props: IProps;
}

export interface IProps extends HtmlProps {
  nodeName?: 'i';
  attrObj?: IntrinsicElementAttributes['i'];
}
