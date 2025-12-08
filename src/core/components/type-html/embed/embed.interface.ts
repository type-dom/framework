import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeEmbed extends ITypeHtml {
  props: EmbedProps;
}

export interface EmbedProps extends HtmlProps {
  nodeName?: 'embed';
  attrObj?: IntrinsicElementAttributes['embed'];
}
