import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeFooter } from '../../type-html/footer/footer.abstract';
import type { IFooter } from './footer.interface';

export class Footer extends TypeFooter implements IFooter {
  className: 'Footer';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Footer';
    this.setParams(params);
  }
}
