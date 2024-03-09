import { ITypeConfig } from '../../../config.interface';
import { TypeData } from '../../../type-element/type-html/data/data.abstract';
import type { IData } from './data.interface';

export class Data extends TypeData implements IData {
  className: 'Data';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Data';
    this.setConfig(config);
  }
}
