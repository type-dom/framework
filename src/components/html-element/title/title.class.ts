import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeTitle } from '../../../core/type-html/title/title.abstract';
import type { ITitle } from './title.interface';

export class Title extends TypeTitle implements ITitle {
  className: 'Title';

  constructor(params: ITypeConfig = {}) {
    super();
    this.className = 'Title';
    this.slotChild(params.slot);
    this.useParams(params);
  }
}
