import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeMap extends ITypeHtml {
  props: MapProps;
}

export interface MapProps extends HtmlProps {
  nodeName?: 'map';
  attrObj?: IntrinsicElementAttributes['map'];
}
