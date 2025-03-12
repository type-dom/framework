import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeTemplate extends ITypeHtml {
  props: TypeTemplateProps;
}

export interface TypeTemplateProps extends HtmlProps {
  nodeName: 'template';
}
