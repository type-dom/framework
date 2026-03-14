import { TypeAside } from '../../../../core/abstracts/type-html/aside/aside.abstract';
import { AsideProps } from '../../../../core/abstracts/type-html/aside/aside.interface';
import type { IAside } from './aside.interface';

export class Aside extends TypeAside implements IAside {
  className: 'Aside';
  constructor(params: AsideProps = {}) {
    super(params);
    this.className = 'Aside';
  }
}
