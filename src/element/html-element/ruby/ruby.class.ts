import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeRuby } from '../../../type-element/type-html/ruby/ruby.abstract';
import { XElement } from '../../x-element/x-element.class';
import { IRuby } from './ruby.interface';
export class Ruby extends TypeRuby implements IRuby {
  className: 'Ruby';
  constructor(public parent: TypeHtml | XElement) {
    super();
    this.className = 'Ruby';
  }
}
