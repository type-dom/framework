
import type { ITypeSvg } from '../../../core/type-svg/type-svg.interface';

export interface ISvgMask extends ITypeSvg {
  nodeName: 'mask';
  className: 'SvgMask';
  childNodes: ITypeSvg[];
}
