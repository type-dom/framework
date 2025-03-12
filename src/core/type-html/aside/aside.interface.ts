import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeAside extends ITypeHtml {
  props: TypeAsideProps;
}

export interface TypeAsideProps extends HtmlProps {
  nodeName?: 'aside';
}
