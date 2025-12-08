import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeMark extends ITypeHtml {
  props: MarkProps;
}

export interface MarkProps extends HtmlProps {
  nodeName?: 'mark';
  attrObj?: IntrinsicElementAttributes['mark'];
}
