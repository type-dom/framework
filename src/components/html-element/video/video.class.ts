import { TypeVideo } from '../../../core/type-html/video/video.abstract';
import { TypeVideoProps } from '../../../core/type-html/video/video.interface';
import type { IVideo } from './video.interface';

export class Video extends TypeVideo implements IVideo {
  className: 'Video';

  override isBasic = true;

  constructor(params: TypeVideoProps = {}) {
    super();
    this.className = 'Video';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
