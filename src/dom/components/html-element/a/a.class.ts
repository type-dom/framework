import { TypeA } from '../../../../core/abstracts/type-html/a/a.abstract';
import { AProps } from '../../../../core/abstracts/type-html/a/a.interface';
import type { IA } from './a.interface';

export class A extends TypeA implements IA {
  className: 'A';

  constructor(params: AProps = {}) {
    super(params);
    this.className = 'A';
  }
}
