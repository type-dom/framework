
import type { ITypeSvg } from '../../../../core/abstracts/type-svg/type-svg.interface';

export interface ISvgMask extends ITypeSvg {
  nodeName: 'mask';
  className: 'SvgMask';
  childNodes: ITypeSvg[];
}
