import { TypeProps } from '../../../core/type-node/type-node.interface';
import { ITypeSvg } from '../../../core/type-svg/type-svg.interface';

export interface ISvgFeGaussianBlur extends ITypeSvg {
  nodeName: 'feGaussianBlur';
  className: 'SvgFeGaussianBlur';
  childNodes: [];
}

export interface SvgFeGaussianBlurProps extends TypeProps {
  // styleObj?: ISvgEllipseStyle;
  // attrObj?: ISvgEllipseAttribute;
  attrObj?: {
    in?: string;
    stdDeviation?: string;
  };
}
