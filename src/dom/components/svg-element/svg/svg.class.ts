import { SvgProps } from '../../../../core/abstracts/type-svg/type-svg.interface';
import { TypeSvgSvg } from '../../../../core/abstracts/type-svg/svg/svg.abstract';
import type { ISvgSvg } from './svg.interface';

// scalable vector graphic 可伸缩矢量图型
export class SvgSvg extends TypeSvgSvg implements ISvgSvg {
  className: 'SvgSvg';

  constructor(params: SvgProps = {}) {
    super(params);
    this.className = 'SvgSvg';
  }
}
