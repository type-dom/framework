import { ITypeConfig } from '../../../config.interface';
import { TypeSource } from '../../../type-element/type-html/source/source.abstract';
import type { ISource } from './source.interface';

export class Source extends TypeSource implements ISource {
  className: 'Source';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Source';
    this.setConfig(config);
  }
}
