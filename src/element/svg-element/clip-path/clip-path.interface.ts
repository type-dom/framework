import { ITypeSvg } from '../../../type-element/type-svg/type-svg.interface';
export interface ISvgClipPath extends ITypeSvg {
  nodeName: 'clipPath',
  className: 'SvgClipPath',
  childNodes: ITypeSvg[]
}
