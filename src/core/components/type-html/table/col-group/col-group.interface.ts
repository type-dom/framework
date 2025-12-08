import { IntrinsicElementAttributes } from '../../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeTableColGroup extends ITypeHtml {
  props: TableColGroupProps;
}

export interface TableColGroupProps extends HtmlProps {
  nodeName?: 'colgroup';
  attrObj?: IntrinsicElementAttributes['colgroup'];
}
