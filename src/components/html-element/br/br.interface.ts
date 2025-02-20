import type { ITypeBr, ITypeBrConfig } from '../../../core/type-html/br/br.interface';
import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeHtml } from '../../../index';

export interface IBr extends ITypeBr {
  className: 'Br';
  props: IBrConfig;
}

export interface IBrConfig extends ITypeBrConfig {
  attrObj: never;
  styleObj: never;
  childNodes: never;
}
