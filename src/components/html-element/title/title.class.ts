import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeTitle } from '../../../core/type-html/title/title.abstract';
import type { ITitle } from './title.interface';

export class Title extends TypeTitle implements ITitle {
  className: 'Title';

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Title';
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
