import { TypeHtml } from '../type-html.abstract';
import { ITypeMark, TypeMarkProps } from './mark.interface';

export abstract class TypeMark extends TypeHtml implements ITypeMark {
  props: TypeMarkProps;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'mark'
    })
  }
}
