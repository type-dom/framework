import type { ITypeSvg } from '../../../../core/components/type-svg/type-svg.interface';
import type { ISvgStop } from '../stop/stop.interface';

export interface ISvgLinearGradient extends ITypeSvg {
  nodeName: 'linearGradient';
  className: 'SvgLinearGradient';
  childNodes: ISvgStop[];
}

// export interface SvgLinearGradientProps extends TypeProps {
//   parent?: SvgDefs;
//   attrObj?: ISvgLinearGradientAttribute;
// }
