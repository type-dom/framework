import { TypeTrack } from '../../../../core/components/type-html/track/track.abstract';
import { TypeTrackProps } from '../../../../core/components/type-html/track/track.interface';
import type { ITrack } from './track.interface';

export class Track extends TypeTrack implements ITrack {
  className: 'Track';

  override isBasic = true;

  constructor(params: TypeTrackProps = {}) {
    super();
    this.className = 'Track';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
