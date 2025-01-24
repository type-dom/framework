import { TypeHtml } from '../type-html.abstract';
import { ITypeDiv, ITypeDivConfig } from './div.interface';

export abstract class TypeDiv extends TypeHtml implements ITypeDiv {
  props: ITypeDivConfig;
  dom?: HTMLDivElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'div'
    })
  }
}
