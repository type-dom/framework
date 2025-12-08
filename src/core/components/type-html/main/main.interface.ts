import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeMain extends ITypeHtml {
  props: MainProps;
}

export interface MainProps extends HtmlProps {
  nodeName?: 'main';
  attrObj?: IntrinsicElementAttributes['main'];
}
