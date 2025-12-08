import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeTextarea extends ITypeHtml {
  props: TextareaProps;
}

export interface TextareaProps extends HtmlProps {
  nodeName?: 'textarea';

  attrObj?: IntrinsicElementAttributes['textarea'],
}
