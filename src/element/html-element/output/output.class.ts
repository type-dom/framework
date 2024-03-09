import { ITypeConfig } from '../../../config.interface';
import { TypeOutput } from '../../../type-element/type-html/output/output.abstract';
import type { IOutput } from './output.interface';

export class Output extends TypeOutput implements IOutput {
  className: 'Output';

  constructor(config?: Partial<ITypeConfig>) {
    super();
    this.className = 'Output';
    this.setConfig(config);
  }
}
