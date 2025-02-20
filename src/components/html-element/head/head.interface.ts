import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import type { ITypeHead, ITypeHeadConfig } from '../../../core/type-html/head/head.interface';

export interface IHead extends ITypeHead {
  className: 'Head';
}

export interface IHeadConfig extends ITypeHeadConfig {
  nodeName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
