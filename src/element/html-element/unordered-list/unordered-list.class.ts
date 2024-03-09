import { ITypeConfig } from '../../../config.interface';
import { TypeUL } from '../../../type-element/type-html/ul/ul.abstract';
import type { IUnorderedList } from './unordered-list.interface';

export class UnorderedList extends TypeUL implements IUnorderedList {
  className: 'UnorderedList';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'UnorderedList';
    this.setConfig(config);
  }
}
