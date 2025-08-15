import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeVideo extends ITypeHtml {
  props: TypeVideoProps;
}

export interface TypeVideoProps extends HtmlProps {
  nodeName?: 'video';
  attrObj?: IntrinsicElementAttributes['video'];
}
