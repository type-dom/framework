import { TypeAudio } from '../../../core/type-html/audio/audio.abstract';
import { TypeAudioProps } from '../../../core/type-html/audio/audio.interface';
import type { IAudio } from './audio.interface';

export class Audio extends TypeAudio implements IAudio {
  className: 'Audio';

  override isBasic = true;

  constructor(params: TypeAudioProps = {}) {
    super();
    this.className = 'Audio';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
