import { Attributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSlot extends ITypeHtml {
  props: SlotProps;
}

export interface SlotProps extends HtmlProps {
  attrObj?: Attributes;
}
