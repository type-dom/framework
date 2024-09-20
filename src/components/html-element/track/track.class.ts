import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeTrack } from '../../../core/type-html/track/track.abstract';
import type { ITrack } from './track.interface';

export class Track extends TypeTrack implements ITrack {
  className: 'Track';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Track';
    this.useParams(params);
  }
}
