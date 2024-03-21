import type { ITypeBr } from '../../../type-element/type-html/br/br.interface';
import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeHtml } from '../../../type-element';

export interface IBr extends ITypeBr {
  className: 'Br';
}

export interface IBrConfig extends ITypeConfig {
  parent: TypeHtml;
  attrObj: never;
  styleObj: never;
  childNodes: never;
}
