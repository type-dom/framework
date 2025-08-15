import { TypeHtml } from '../type-html.abstract';
import { ITypeOutput, TypeOutputProps } from './output.interface';

export abstract class TypeOutput extends TypeHtml implements ITypeOutput {
  props: TypeOutputProps;
  dom?: HTMLOutputElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'output'
    })
  }
}
