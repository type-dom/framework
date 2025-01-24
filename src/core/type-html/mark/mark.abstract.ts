import { TypeHtml } from '../type-html.abstract';
import { ITypeMark, ITypeMarkConfig } from './mark.interface';

export abstract class TypeMark extends TypeHtml implements ITypeMark {
  props: ITypeMarkConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'mark'
    })
  }
}
