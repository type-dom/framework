import { ITypeConfig } from '../../../type-node/type-node.interface';
import { TypeTitle } from '../../../type-element/type-html/title/title.abstract';
import type { ITitle } from './title.interface';

export class Title extends TypeTitle implements ITitle {
  className: 'Title';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Title';
    this.setConfig(config);
  }
}
