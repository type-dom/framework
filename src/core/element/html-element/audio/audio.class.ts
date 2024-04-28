import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeAudio } from '../../../type-element/type-html/audio/audio.abstract';
import type { IAudio } from './audio.interface';

export class Audio extends TypeAudio implements IAudio {
  className: 'Audio';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Audio';
    this.setConfig(config);
  }
}
