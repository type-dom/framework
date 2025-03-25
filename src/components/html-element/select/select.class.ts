import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeSelect } from '../../../core/type-html/select/select.abstract';
import { Option } from '../option/option.class';
import type { ISelect } from './select.interface';

export class Select extends TypeSelect implements ISelect {
  className: 'Select';
  override childNodes: Option[];
  value?: string | number | boolean;

  override isBasic = true;

  constructor(params: TypeProps = {}) {
    super();
    this.className = 'Select';
    this.childNodes = [];
    this.slotChildren(params.slot);
    this.useParams(params);
  }
}
