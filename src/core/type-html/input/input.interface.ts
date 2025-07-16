import { IntrinsicElementAttributes } from '../../attribute';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeInput extends ITypeHtml {
  props: TypeInputProps;
}

export interface TypeInputProps extends HtmlProps {
  nodeName?: 'input';
  attrObj?: IntrinsicElementAttributes['input'];
}
