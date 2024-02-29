import type { ITypeHtml } from '../type-html.interface';
import type { ITypeLI } from '../ul/li/li.interface';
import type { ITypeUL } from '../ul/ul.interface';
import type { ITypeAttribute } from '../../type-element.interface';
export interface ITypeOlAttr extends ITypeAttribute {
  type: string,
  start: string,
}
export interface ITypeOL extends ITypeHtml {
  nodeName: 'ol',
  childNodes: (ITypeUL | ITypeLI)[]
}
