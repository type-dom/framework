import type { ITypeNode } from '../../../type-node/type-node.interface';
import type { ITypeImg } from '../../../type-element/type-html/img/img.interface';
export interface IImg extends ITypeImg {
  className: 'Img',
  childNodes: ITypeNode[],
}
