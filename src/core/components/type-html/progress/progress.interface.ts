import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeProgress extends ITypeHtml {
  props: ProgressProps;
}

export interface ProgressProps extends HtmlProps {
  nodeName?: 'progress';
  attrObj?: IntrinsicElementAttributes['progress'];
}
