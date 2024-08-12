import type { ITypeSvg } from '../../../type-svg/type-svg.interface';

export interface ISvgUse extends ITypeSvg {
  nodeName: 'use';
  className: 'SvgUse';
  childNodes: [];
}
