import { TypeA } from '../../../../core/components/type-html/a/a.abstract';
import { TypeAProps } from '../../../../core/components/type-html/a/a.interface';
import type { IA } from './a.interface';

export class A extends TypeA implements IA {
  className: 'A';
  override isBasic = true;

  constructor(params: TypeAProps = {}) {
    super();
    this.className = 'A';
    this.useParams(params);
  }

  override setup() {
    const props = this.props;
    this.slotChildren(props.slot);
  }
}
