import type { ITypeSvg } from '../../../../core/abstracts/type-svg/type-svg.interface';

export interface ISvgUse extends ITypeSvg {
  nodeName: 'use';
  className: 'SvgUse';
  childNodes: [];
}
