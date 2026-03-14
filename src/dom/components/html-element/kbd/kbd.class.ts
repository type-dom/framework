import { TypeKbd } from '../../../../core/abstracts/type-html/kbd/kbd.abstract';
import { KbdProps } from '../../../../core/abstracts/type-html/kbd/kbd.interface';
import type { IKbd } from './kbd.interface';

export class Kbd extends TypeKbd implements IKbd {
  className: 'Kbd';
  constructor(params: KbdProps = {}) {
    super(params);
    this.className = 'Kbd';
  }
}
