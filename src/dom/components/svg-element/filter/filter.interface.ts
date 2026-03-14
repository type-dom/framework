import { ITypeSvg } from '../../../../core/abstracts/type-svg/type-svg.interface';

export interface ISvgFilter extends ITypeSvg {
  nodeName: 'filter';
  className: 'SvgFilter';
  // childNodes: ITypeSvg[];
}
