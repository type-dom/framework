import { Attributes } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSlot extends ITypeHtml {
  props: TypeSlotProps;
}

export interface TypeSlotProps extends HtmlProps {
  nodeName?: 'slot';
  attrObj?: Attributes;
}
