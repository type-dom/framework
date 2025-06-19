import { TypeHtml } from '../type-html.abstract';
import { ITypeDfn, TypeDfnProps } from './dfn.interface';

export abstract class TypeDfn extends TypeHtml implements ITypeDfn {
  props: TypeDfnProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'dfn'
    });
  }
}
