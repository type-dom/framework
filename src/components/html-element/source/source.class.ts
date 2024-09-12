import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeSource } from '../../type-html/source/source.abstract';
import type { ISource } from './source.interface';

export class Source extends TypeSource implements ISource {
  className: 'Source';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Source';
    this.setProps(params);
  }
}
