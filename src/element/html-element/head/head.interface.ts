import type { ITypeHead } from '../../../type-element/type-html/head/head.interface';
import { ITypeConfig } from '@type-dom/framework';

export interface IHead extends ITypeHead {
  nodeName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className: 'Head';
}

export interface IHeadConfig extends ITypeConfig {
  nodeName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
