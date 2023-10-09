import { ITypeSvg } from '../../../type-element/type-svg/type-svg.interface';
export interface ISvgDefs extends ITypeSvg {
  nodeName: 'defs',
  className: 'SvgDefs',
  childNodes: ITypeSvg[]
}
