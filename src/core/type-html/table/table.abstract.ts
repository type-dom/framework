import { TypeHtml } from '../type-html.abstract';
import { ITypeTable, ITypeTableConfig } from './table.interface';

export abstract class TypeTable extends TypeHtml implements ITypeTable {
  props: ITypeTableConfig;
  dom?: HTMLTableElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'table'
    })
  }
}
