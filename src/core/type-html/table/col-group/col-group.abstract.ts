import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableColGroup, ITypeTableColGroupConfig } from './col-group.interface';

export abstract class TypeTableColGroup extends TypeHtml implements ITypeTableColGroup {
  props: ITypeTableColGroupConfig;
  dom?: HTMLTableColElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'colgroup'
    })
  }
}
