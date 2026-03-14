import { TypeData } from '../../../../core/abstracts/type-html/data/data.abstract';
import { DataProps } from '../../../../core/abstracts/type-html/data/data.interface';
import type { IData } from './data.interface';

export class Data extends TypeData implements IData {
  className: 'Data';
  constructor(params: DataProps = {}) {
    super(params);
    this.className = 'Data';
  }
}
