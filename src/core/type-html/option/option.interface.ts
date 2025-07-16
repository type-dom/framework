import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeOption extends ITypeHtml {
  props: TypeOptionProps;
}

export interface TypeOptionProps extends HtmlProps {
  nodeName?: 'option';
  attrObj?: IntrinsicElementAttributes['option'];
}
