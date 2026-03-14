import { TypeBase } from '../../../../core/abstracts/type-html/base/base.abstract';
import { BaseProps } from '../../../../core/abstracts/type-html/base/base.interface';
import type { IBase } from './base.interface';

export class Base extends TypeBase implements IBase {
  className: 'Base';
  constructor(params: BaseProps = {}) {
    super(params);
    this.className = 'Base';
  }
}
