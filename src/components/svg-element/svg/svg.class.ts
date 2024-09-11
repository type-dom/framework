import { TypeSvgSvg } from '../../type-svg/svg/svg.abstract';
import { ITypeConfig } from '../../../core/type-node/type-node.interface';
import type { ISvgSvg } from './svg.interface';

// scalable vector graphic 可伸缩矢量图型
export class SvgSvg extends TypeSvgSvg implements ISvgSvg {
  className: 'SvgSvg';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'SvgSvg';
    this.setProps(params);
  }
}
