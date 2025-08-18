import type { ITypeSvg } from '../../../../core/components/type-svg/type-svg.interface';

export interface ISvgSvg extends ITypeSvg {
  nodeName: 'svg';
  className: 'SvgSvg';
  childNodes: ITypeSvg[];
}
