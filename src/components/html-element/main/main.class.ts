import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeMain } from '../../type-html/main/main.abstract';
import type { IMain } from './main.interface';

export class Main extends TypeMain implements IMain {
  className: 'Main';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Main';
    this.setProps(params);
  }
}
