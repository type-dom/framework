import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeAudio } from '../../../core/type-html/audio/audio.abstract';
import type { IAudio } from './audio.interface';

export class Audio extends TypeAudio implements IAudio {
  className: 'Audio';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Audio';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
