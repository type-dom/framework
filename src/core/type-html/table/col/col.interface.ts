import type { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeTableCol extends ITypeHtml {
  props: TypeTableColProps;
}

export interface TypeTableColProps extends HtmlProps {
  nodeName?: 'col';
}
