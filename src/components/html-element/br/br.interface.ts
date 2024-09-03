import type { ITypeBr } from '../../type-html/br/br.interface';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeHtml } from '../../../index';

export interface IBr extends ITypeBr {
  className: 'Br';
}

export interface IBrConfig extends ITypeConfig {
  parent: TypeHtml;
  attrObj: never;
  styleObj: never;
  childNodes: never;
}
