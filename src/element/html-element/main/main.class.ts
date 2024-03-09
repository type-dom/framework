import { ITypeConfig } from '../../../config.interface';
import { TypeMain } from '../../../type-element/type-html/main/main.abstract';
import type { IMain } from './main.interface';

export class Main extends TypeMain implements IMain {
  className: 'Main';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Main';
    this.setConfig(config);
  }
}
