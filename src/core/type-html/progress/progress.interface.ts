import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeProgress extends ITypeHtml {
  props: TypeProgressProps;
}

export interface TypeProgressProps extends HtmlProps {
  nodeName?: 'progress';
  attrObj?: IntrinsicElementAttributes['progress'];
}
