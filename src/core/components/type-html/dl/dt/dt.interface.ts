import { IntrinsicElementAttributes } from '../../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeDT extends ITypeHtml {
  props: TypeDTProps;
}

export interface TypeDTProps extends HtmlProps {
  nodeName?: 'dt';
  attrObj?: IntrinsicElementAttributes['dt'];
}
