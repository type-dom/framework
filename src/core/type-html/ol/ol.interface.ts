import { ITypeAttribute } from '../../../core/type-element/type-element.interface';
import type { ITypeHtml, ITypeHtmlConfig } from '../type-html.interface';
import type { ITypeLI } from '../li/li.interface';
import type { ITypeUL } from '../ul/ul.interface';

export interface ITypeOlAttr extends ITypeAttribute {
  type: string;
  start: string;
}

export interface ITypeOL extends ITypeHtml {
  props: ITypeOLConfig;
  childNodes: (ITypeUL | ITypeLI)[];
}

export interface ITypeOLConfig extends ITypeHtmlConfig {
  nodeName?: 'ol';
}
