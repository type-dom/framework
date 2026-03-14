import { TypeOptGroup } from '../../../../core/abstracts/type-html/opt-group/opt-group.abstract';
import { OptGroupProps } from '../../../../core/abstracts/type-html/opt-group/opt-group.interface';
import { addAttrName } from '../../../modules/attribute';
import type { IOptGroup } from './opt-group.interface';

export class OptGroup extends TypeOptGroup implements IOptGroup {
  className: 'OptGroup';
  constructor(params: OptGroupProps = {}) {
    super(params);
    this.className = 'OptGroup';
    addAttrName(this, 'option');
  }
}
