import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeTrack } from '../../../type-element/type-html/track/track.abstract';
import type { ITrack } from './track.interface';

export class Track extends TypeTrack implements ITrack {
  className: 'Track';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Track';
    this.setConfig(config);
  }
}
