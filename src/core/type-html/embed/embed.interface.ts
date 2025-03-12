import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeEmbed extends ITypeHtml {
  props: TypeEmbedProps;
}

export interface TypeEmbedProps extends HtmlProps {
  nodeName?: 'embed';
}
