import { TypeHtml } from '../type-html.abstract';
import { ITypeDfn, ITypeDfnConfig } from './dfn.interface';

export abstract class TypeDfn extends TypeHtml implements ITypeDfn {
  props: ITypeDfnConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'dfn'
    });
  }
}
