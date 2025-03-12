import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableColGroup, TypeTableColGroupProps } from './col-group.interface';

export abstract class TypeTableColGroup extends TypeHtml implements ITypeTableColGroup {
  props: TypeTableColGroupProps;
  dom?: HTMLTableColElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'colgroup'
    })
  }
}
