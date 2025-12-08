import { TypeAudio } from '../../../../core/components/type-html/audio/audio.abstract';
import { AudioProps } from '../../../../core/components/type-html/audio/audio.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IAudio } from './audio.interface';

export class Audio extends TypeAudio implements IAudio {
  className: 'Audio';

  override isBasic = true;

  constructor(params: AudioProps = {}) {
    super(params);
    this.className = 'Audio';
    transformSlot(this, params.slot);
  }
}
