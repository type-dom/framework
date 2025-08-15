import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeCanvas extends ITypeHtml {
  props: TypeCanvasProps;
}

export interface TypeCanvasProps extends HtmlProps {
  nodeName?: 'canvas';
  attrObj?: IntrinsicElementAttributes['canvas'];
}
