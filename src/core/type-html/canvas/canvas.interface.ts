import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeCanvas extends ITypeHtml {
  props: TypeCanvasProps;
}

export interface TypeCanvasProps extends HtmlProps {
  nodeName?: 'canvas';
}
