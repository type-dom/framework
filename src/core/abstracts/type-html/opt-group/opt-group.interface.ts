import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeOptGroup extends ITypeHtml {
  props: OptGroupProps;
}

export interface OptGroupProps extends HtmlProps {
  attrObj?: IntrinsicElementAttributes['optgroup'];
}
