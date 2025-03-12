import { TypeHtml } from '../type-html.abstract';
import { ITypeLabel, TypeLabelProps } from './label.interface';

export abstract class TypeLabel extends TypeHtml implements ITypeLabel {
  props: TypeLabelProps;
  dom?: HTMLLabelElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'label'
    })
  }
}
