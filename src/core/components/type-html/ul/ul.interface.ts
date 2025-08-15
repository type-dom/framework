import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';
import type { ITypeLI } from '../li/li.interface';

export interface ITypeUL extends ITypeHtml {
  props: TypeULProps;
  childNodes: ITypeLI[];
}

export interface TypeULProps extends HtmlProps {
  nodeName?: 'ul';
  attrObj?: IntrinsicElementAttributes['ul'];
}
