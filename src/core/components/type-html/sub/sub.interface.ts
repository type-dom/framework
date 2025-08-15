import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSub extends ITypeHtml {
  props: TypeSubProps;
}

export interface TypeSubProps extends HtmlProps {
  nodeName?: 'sub';
  attrObj?: IntrinsicElementAttributes['sub'];
}
