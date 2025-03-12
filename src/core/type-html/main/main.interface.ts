import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeMain extends ITypeHtml {
  props: TypeMainProps;
}

export interface TypeMainProps extends HtmlProps {
  nodeName?: 'main';
}
