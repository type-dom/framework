import { TypeHtml } from '../type-html.abstract';
import { ITypeFieldset, ITypeFieldsetConfig } from './fieldset.interface';

export abstract class TypeFieldset extends TypeHtml implements ITypeFieldset {
  props: ITypeFieldsetConfig;
  dom?: HTMLFieldSetElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'fieldset'
    })
  }
}
