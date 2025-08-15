import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSource extends ITypeHtml {
  props: TypeSourceProps;
}

export interface TypeSourceProps extends HtmlProps {
  nodeName?: 'source';
  attrObj?: IntrinsicElementAttributes['source'];
}
