import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeSource extends ITypeHtml {
  props: SourceProps;
}

export interface SourceProps extends HtmlProps {
  nodeName?: 'source';
  attrObj?: IntrinsicElementAttributes['source'];
}
