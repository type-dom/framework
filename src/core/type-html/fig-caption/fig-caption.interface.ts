import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeFigCaption extends ITypeHtml {
  props: TypeFigCaptionProps;
}

export interface TypeFigCaptionProps extends HtmlProps {
  nodeName: 'figcaption';
}
