import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeMap extends ITypeHtml {
  props: TypeMapProps;
}

export interface TypeMapProps extends HtmlProps {
  nodeName?: 'map';
}
