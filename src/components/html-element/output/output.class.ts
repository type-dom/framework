import type { ITypeConfig } from '../../../core/type-node/type-node.interface';
import { TypeOutput } from '../../type-html/output/output.abstract';
import type { IOutput } from './output.interface';

export class Output extends TypeOutput implements IOutput {
  className: 'Output';

  constructor(params?: ITypeConfig) {
    super();
    this.className = 'Output';
    this.setProps(params);
  }
}
