import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import { MaybeRef } from '../../../../reactivity/ref';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeDiv extends ITypeHtml {
  props: DivProps;
}

export interface DivProps extends HtmlProps {
  attrObj?: MaybeRef<IntrinsicElementAttributes['div']>;
}
