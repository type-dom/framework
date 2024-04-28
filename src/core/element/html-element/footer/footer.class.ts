import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeFooter } from '../../../type-element/type-html/footer/footer.abstract';
import type { IFooter } from './footer.interface';

export class Footer extends TypeFooter implements IFooter {
  className: 'Footer';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Footer';
    this.setConfig(config);
  }
}
