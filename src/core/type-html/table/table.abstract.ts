import { TypeHtml } from '../type-html.abstract';
import { ITypeTable, TypeTableProps } from './table.interface';

export abstract class TypeTable extends TypeHtml implements ITypeTable {
  props: TypeTableProps;
  dom?: HTMLTableElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'table'
    })
  }
}
