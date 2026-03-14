import { TypeOutput } from '../../../../core/abstracts/type-html/output/output.abstract';
import { OutputProps } from '../../../../core/abstracts/type-html/output/output.interface';
import type { IOutput } from './output.interface';

export class Output extends TypeOutput implements IOutput {
  className: 'Output';
  constructor(params: OutputProps = {}) {
    super(params);
    this.className = 'Output';
  }
}
