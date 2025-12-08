import { TypeTrack } from '../../../../core/components/type-html/track/track.abstract';
import { TrackProps } from '../../../../core/components/type-html/track/track.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ITrack } from './track.interface';

export class Track extends TypeTrack implements ITrack {
  className: 'Track';
  override isBasic = true;

  constructor(params: TrackProps = {}) {
    super(params);
    this.className = 'Track';
    transformSlot(this, params.slot);
  }
}
