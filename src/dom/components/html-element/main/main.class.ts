import { TypeMain } from '../../../../core/abstracts/type-html/main/main.abstract';
import { MainProps } from '../../../../core/abstracts/type-html/main/main.interface';
import type { IMain } from './main.interface';

export class Main extends TypeMain implements IMain {
  className: 'Main';
  constructor(params: MainProps = {}) {
    super(params);
    this.className = 'Main';
  }
}
