import { TypeHtml } from '../type-html.abstract';
import { ITypeDiv, TypeDivProps } from './div.interface';

export abstract class TypeDiv extends TypeHtml implements ITypeDiv {
  props: TypeDivProps;
  dom?: HTMLDivElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'div'
    })
  }
}
