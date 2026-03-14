import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute';
import { MaybeRef } from '../../../../reactivity/ref';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeA extends ITypeHtml {
  props: AProps;
}

export interface AProps extends HtmlProps {
  attrObj?: MaybeRef<IntrinsicElementAttributes['a'] | undefined>
}
