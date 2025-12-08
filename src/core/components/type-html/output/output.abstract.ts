import { TypeHtml } from '../type-html.abstract';
import { ITypeOutput, OutputProps } from './output.interface';

export abstract class TypeOutput<Props extends OutputProps = OutputProps> extends TypeHtml<Props> implements ITypeOutput {
  dom: HTMLOutputElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'output'
    } as Props);
    this.dom = document.createElement('output');
  }
}
