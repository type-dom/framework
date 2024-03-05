import type { ITypeHtml } from '../type-html.interface';
import type { ITypeLI } from './li/li.interface';

export interface ITypeUL extends ITypeHtml {
  nodeName: 'ul';
  childNodes: ITypeLI[];
}
