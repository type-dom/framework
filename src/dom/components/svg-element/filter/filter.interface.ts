import { ITypeSvg } from '../../../../core/components/type-svg/type-svg.interface';

export interface ISvgFilter extends ITypeSvg {
  nodeName: 'filter';
  className: 'SvgFilter';
  // childNodes: ITypeSvg[];
}
