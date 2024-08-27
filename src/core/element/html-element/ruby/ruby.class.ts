import type { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeRuby } from '../../../type-html/ruby/ruby.abstract';
import type { IRuby } from './ruby.interface';

export class Ruby extends TypeRuby implements IRuby {
  className: 'Ruby';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Ruby';
    this.setConfig(config);
  }
}
