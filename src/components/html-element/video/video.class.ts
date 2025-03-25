import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeVideo } from '../../../core/type-html/video/video.abstract';
import type { IVideo } from './video.interface';

export class Video extends TypeVideo implements IVideo {
  className: 'Video';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Video';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
