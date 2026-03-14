import { TypeRuby } from '../../../../core/abstracts/type-html/ruby/ruby.abstract';
import { RubyProps } from '../../../../core/abstracts/type-html/ruby/ruby.interface';
import type { IRuby } from './ruby.interface';

export class Ruby extends TypeRuby implements IRuby {
  className: 'Ruby';

  constructor(params: RubyProps = {}) {
    super(params);
    this.className = 'Ruby';
  }
}
