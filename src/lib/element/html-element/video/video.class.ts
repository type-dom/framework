import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeVideo } from '../../../type-element/type-html/video/video.abstract';
import type { IVideo } from './video.interface';

export class Video extends TypeVideo implements IVideo {
  className: 'Video';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Video';
    this.setConfig(config);
  }
}
