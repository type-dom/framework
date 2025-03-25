import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeTrack } from '../../../core/type-html/track/track.abstract';
import type { ITrack } from './track.interface';

export class Track extends TypeTrack implements ITrack {
  className: 'Track';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Track';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
