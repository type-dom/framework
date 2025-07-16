import { IntrinsicElementAttributes } from '../../attribute/attribute.interface';
// import { ITypeAttribute } from '../../attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';
import type { ITypeLI } from '../li/li.interface';
import type { ITypeUL } from '../ul/ul.interface';

export interface ITypeOL extends ITypeHtml {
  props: TypeOLProps;
  childNodes: (ITypeUL | ITypeLI)[];
}

export interface TypeOLProps extends HtmlProps {
  nodeName?: 'ol';
  attrObj?: IntrinsicElementAttributes['ol'];
}
