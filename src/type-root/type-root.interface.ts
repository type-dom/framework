import { ITypeDiv } from '../type-element/type-html/div/div.interface';
import { TypeRoot } from './type-root.abstract';
export interface ITypeRoot extends ITypeDiv {
  // className: 'TypeRoot',
  parent: TypeRoot;
}
