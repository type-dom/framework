import { TypeOption } from '../../../../core/abstracts/type-html/option/option.abstract';
import { OptionProps } from '../../../../core/abstracts/type-html/option/option.interface';
import type { IOption } from './option.interface';

export class Option extends TypeOption implements IOption {
  className: 'Option';
  constructor(params: OptionProps= {}) {
    super(params);
    this.className = 'Option';
  }
}
