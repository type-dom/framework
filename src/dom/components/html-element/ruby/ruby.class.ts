import { TypeRuby } from '../../../../core/components/type-html/ruby/ruby.abstract';
import { RubyProps } from '../../../../core/components/type-html/ruby/ruby.interface';
import { transformSlot } from '../../../../core/helpers/transformSlot';
import type { IRuby } from './ruby.interface';

export class Ruby extends TypeRuby implements IRuby {
  className: 'Ruby';
  override isBasic = true;

  constructor(params: RubyProps = {}) {
    super(params);
    this.className = 'Ruby';
    transformSlot(this, params.slot);
  }
}
