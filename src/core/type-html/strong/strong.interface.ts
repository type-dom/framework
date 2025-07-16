import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeStrong extends ITypeHtml {
  props: TypeStrongProps;
}

export interface TypeStrongProps extends HtmlProps {
  nodeName?: 'strong';
  attrObj?: IntrinsicElementAttributes['strong'];
}
