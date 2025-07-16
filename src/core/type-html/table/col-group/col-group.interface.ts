import { IntrinsicElementAttributes } from '../../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeTableColGroup extends ITypeHtml {
  props: TypeTableColGroupProps;
}

export interface TypeTableColGroupProps extends HtmlProps {
  nodeName?: 'colgroup';
  attrObj?: IntrinsicElementAttributes['colgroup'];
}
