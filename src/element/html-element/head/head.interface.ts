import { ITypeHead } from '../../../type-element/type-html/head/head.interface';
export interface IHead extends ITypeHead {
  nodeName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6',
  className: 'Head',
}
