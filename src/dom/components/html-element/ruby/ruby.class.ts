import { TypeRuby } from '../../../../core/components/type-html/ruby/ruby.abstract';
import { TypeRubyProps } from '../../../../core/components/type-html/ruby/ruby.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IRuby } from './ruby.interface';

export class Ruby extends TypeRuby implements IRuby {
  className: 'Ruby';

  override isBasic = true;

  constructor(params: TypeRubyProps = {}) {
    super();
    this.className = 'Ruby';
    transformSlot(this, params.slot);
    this.useParams(params);
  }
}
