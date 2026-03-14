import { TypeVideo } from '../../../../core/abstracts/type-html/video/video.abstract';
import { VideoProps } from '../../../../core/abstracts/type-html/video/video.interface';
import type { IVideo } from './video.interface';

export class Video extends TypeVideo implements IVideo {
  className: 'Video';

  constructor(params: VideoProps = {}) {
    super(params);
    this.className = 'Video';
  }
}
