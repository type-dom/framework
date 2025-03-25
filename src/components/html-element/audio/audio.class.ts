import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeAudio } from '../../../core/type-html/audio/audio.abstract';
import type { IAudio } from './audio.interface';

export class Audio extends TypeAudio implements IAudio {
  className: 'Audio';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Audio';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
