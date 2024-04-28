import { TypeSvgSvg } from '../../../type-element/type-svg/svg/svg.abstract';
import { ITypeConfig } from '../../../type-node/type-node.interface';
import type { ISvgSvg } from './svg.interface';

// scalable vector graphic 可伸缩矢量图型
export class SvgSvg extends TypeSvgSvg implements ISvgSvg {
  className: 'SvgSvg';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'SvgSvg';
    this.setConfig(config);
  }
}
