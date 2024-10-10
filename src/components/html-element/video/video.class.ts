import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeVideo } from '../../../core/type-html/video/video.abstract';
import type { IVideo } from './video.interface';

export class Video extends TypeVideo implements IVideo {
  className: 'Video';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Video';
    this.useParams(params);
  }
}
