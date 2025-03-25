import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeRuby } from '../../../core/type-html/ruby/ruby.abstract';
import type { IRuby } from './ruby.interface';

export class Ruby extends TypeRuby implements IRuby {
  className: 'Ruby';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Ruby';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
