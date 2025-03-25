import { TypeA } from '../../../core/type-html/a/a.abstract';
import type { TypeProps } from '../../../core/type-node/type-node.interface';
import type { IA } from './a.interface';

export class A extends TypeA implements IA {
  className: 'A';
  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'A';
    this.useParams(params);
  }

  override setup() {
    const props = this.props;
    this.slotChildren(props.slot);
  }
}
