import { TypeHtml } from '../type-html.abstract';
import { ITypeDiv, TypeDivProps } from './div.interface';

export abstract class TypeDiv extends TypeHtml implements ITypeDiv {
  override props: TypeDivProps;
  dom?: HTMLDivElement;

  constructor()  {
    super();
    // console.warn('this.props is ', this.props);
    this.props = this.useParams({
      nodeName: 'div'
    });
  }
}
