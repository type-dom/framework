import { TypeHead } from '../../../core/type-html/head/head.abstract';
import type { IHead, IHeadConfig } from './head.interface';

export class Head extends TypeHead implements IHead {
  className: 'Head';
  override props: IHeadConfig;

  constructor(params?: IHeadConfig) {
    super(params?.nodeName);
    this.className = 'Head';
    this.props = this.useParams(params);
  }
}
