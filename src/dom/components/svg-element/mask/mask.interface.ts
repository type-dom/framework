
import type { ITypeSvg } from '../../../../core/components/type-svg/type-svg.interface';

export interface ISvgMask extends ITypeSvg {
  nodeName: 'mask';
  className: 'SvgMask';
  childNodes: ITypeSvg[];
}
