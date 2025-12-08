import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSub extends ITypeHtml {
  props: SubProps;
}

export interface SubProps extends HtmlProps {
  nodeName?: 'sub';
  attrObj?: IntrinsicElementAttributes['sub'];
}
