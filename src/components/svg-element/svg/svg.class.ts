import { TypeSvgSvg } from '../../../core/type-svg/svg/svg.abstract';
import { TypeProps } from '../../../core/type-node/type-node.interface';
import type { ISvgSvg } from './svg.interface';

// scalable vector graphic 可伸缩矢量图型
export class SvgSvg extends TypeSvgSvg implements ISvgSvg {
  className: 'SvgSvg';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'SvgSvg';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
