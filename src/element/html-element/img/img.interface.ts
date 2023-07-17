import { ITypeNode } from '../../../type-node/type-node.interface';
import { ITypeImg } from '../../../type-element/type-html/img/img.interface';
export interface IImg extends ITypeImg {
  className: 'Img',
  childNodes: ITypeNode[],
}
