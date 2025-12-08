import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeCanvas extends ITypeHtml {
  props: CanvasProps;
}

export interface CanvasProps extends HtmlProps {
  nodeName?: 'canvas';
  attrObj?: IntrinsicElementAttributes['canvas'];
}
