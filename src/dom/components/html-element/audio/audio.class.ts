import { TypeAudio } from '../../../../core/abstracts/type-html/audio/audio.abstract';
import { AudioProps } from '../../../../core/abstracts/type-html/audio/audio.interface';
import type { IAudio } from './audio.interface';

export class Audio extends TypeAudio implements IAudio {
  className: 'Audio';
  constructor(params: AudioProps = {}) {
    super(params);
    this.className = 'Audio';
  }
}
