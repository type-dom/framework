import { ITypeSvg } from '../../../type-svg/type-svg.interface';

export interface ISvgG extends ITypeSvg {
  nodeName: 'g';
  className: 'SvgG';
  childNodes: ITypeSvg[];
}
