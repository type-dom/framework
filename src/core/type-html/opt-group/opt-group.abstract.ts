import { TypeHtml } from '../type-html.abstract';
import { ITypeOptGroup, TypeOptGroupProps } from './opt-group.interface';

export abstract class TypeOptGroup extends TypeHtml implements ITypeOptGroup {
  props: TypeOptGroupProps;
  dom?: HTMLOptGroupElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'optgroup'
    })
  }
}
