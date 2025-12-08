import { TypeVideo } from '../../../../core/components/type-html/video/video.abstract';
import { VideoProps } from '../../../../core/components/type-html/video/video.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IVideo } from './video.interface';

export class Video extends TypeVideo implements IVideo {
  className: 'Video';
  override isBasic = true;

  constructor(params: VideoProps = {}) {
    super(params);
    this.className = 'Video';
    transformSlot(this, params.slot);
  }
}
