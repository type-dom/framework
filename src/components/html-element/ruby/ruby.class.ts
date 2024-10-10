import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeRuby } from '../../../core/type-html/ruby/ruby.abstract';
import type { IRuby } from './ruby.interface';

export class Ruby extends TypeRuby implements IRuby {
  className: 'Ruby';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Ruby';
    this.useParams(params);
  }
}
