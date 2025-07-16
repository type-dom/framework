import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeIns extends ITypeHtml {
  props: TypeInsProps;
}

export interface TypeInsProps extends HtmlProps {
  nodeName?: 'ins';
  attrObj?: IntrinsicElementAttributes['ins'];
}
