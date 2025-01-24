import { TypeHtml } from '../type-html.abstract';
import { ITypeOutput, ITypeOutputConfig } from './output.interface';

export abstract class TypeOutput extends TypeHtml implements ITypeOutput {
  props: ITypeOutputConfig;
  dom?: HTMLOutputElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'output'
    })
  }
}
