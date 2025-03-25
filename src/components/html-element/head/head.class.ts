import { TypeHead } from '../../../core/type-html/head/head.abstract';
import type { IHead, HeadProps } from './head.interface';

export class Head extends TypeHead implements IHead {
  className: 'Head';
  override props: HeadProps;

  override isBasic = true;

  constructor(params?: HeadProps) {
    super(params?.nodeName);
    this.className = 'Head';
    this.slotChildren(params?.slot);
    this.props = this.useParams(params);
  }
}
