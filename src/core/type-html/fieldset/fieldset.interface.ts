import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeFieldset extends ITypeHtml {
  props: TypeFieldsetProps;
}

export interface TypeFieldsetProps extends HtmlProps {
  nodeName?: 'fieldset';
  attrObj?: IntrinsicElementAttributes['fieldset'];
}
