import { TypeHtml } from '../../../type-element/type-html/type-html.abstract';
import { TypeHGroup } from '../../../type-element/type-html/hgroup/hgroup.abstract';
import type { IHGroup } from './h-group.interface';

export class HGroup extends TypeHGroup implements IHGroup {
  className: 'HGroup';

  constructor(public parent?: TypeHtml) {
    super();
    this.className = 'HGroup';
  }
}
