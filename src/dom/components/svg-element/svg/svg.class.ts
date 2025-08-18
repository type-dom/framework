import { SvgProps } from '../../../../core/components/type-svg/type-svg.interface';
import { TypeSvgSvg } from '../../../../core/components/type-svg/svg/svg.abstract';
import type { ISvgSvg } from './svg.interface';

// scalable vector graphic 可伸缩矢量图型
export class SvgSvg extends TypeSvgSvg implements ISvgSvg {
  className: 'SvgSvg';
  override props: SvgProps;

  override isBasic = true;

  constructor(params: SvgProps = {}) {
    super();
    this.className = 'SvgSvg';
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }
}
