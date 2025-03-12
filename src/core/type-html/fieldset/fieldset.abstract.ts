import { TypeHtml } from '../type-html.abstract';
import { ITypeFieldset, TypeFieldsetProps } from './fieldset.interface';

export abstract class TypeFieldset extends TypeHtml implements ITypeFieldset {
  props: TypeFieldsetProps;
  dom?: HTMLFieldSetElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'fieldset'
    })
  }
}
