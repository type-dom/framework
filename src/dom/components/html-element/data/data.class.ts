import { TypeData } from '../../../../core/components/type-html/data/data.abstract';
import { TypeDataProps } from '../../../../core/components/type-html/data/data.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IData } from './data.interface';

export class Data extends TypeData implements IData {
  className: 'Data';

  override isBasic = true;

  constructor(params: TypeDataProps = {}) {
    super();
    this.className = 'Data';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
