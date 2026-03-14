import { TypeNav } from '../../../../core/abstracts/type-html/nav/nav.abstract';
import { NavProps } from '../../../../core/abstracts/type-html/nav/nav.interface';
import type { INav } from './nav.interface';

export class Nav extends TypeNav implements INav {
  className: 'Nav';
  constructor(params: NavProps = {}) {
    super(params);
    this.className = 'Nav';
  }
}
