import { TypeSource } from '../../../../core/components/type-html/source/source.abstract';
import { TypeSourceProps } from '../../../../core/components/type-html/source/source.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { ISource } from './source.interface';

export class Source extends TypeSource implements ISource {
  className: 'Source';

  override isBasic = true;

  constructor(params: TypeSourceProps = {}) {
    super();
    this.className = 'Source';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
