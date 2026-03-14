import { TypeTrack } from '../../../../core/abstracts/type-html/track/track.abstract';
import { TrackProps } from '../../../../core/abstracts/type-html/track/track.interface';
import type { ITrack } from './track.interface';

export class Track extends TypeTrack implements ITrack {
  className: 'Track';

  constructor(params: TrackProps = {}) {
    super(params);
    this.className = 'Track';
  }
}
