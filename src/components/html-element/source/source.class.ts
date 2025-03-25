import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeSource } from '../../../core/type-html/source/source.abstract';
import type { ISource } from './source.interface';

export class Source extends TypeSource implements ISource {
  className: 'Source';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Source';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
