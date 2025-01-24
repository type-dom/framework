import { TypeHtml } from '../../type-html.abstract';
import { TypeTableRow } from '../row/row.abstract';
import { ITypeTableBody, ITypeTableBodyConfig } from './body.interface';

export abstract class TypeTableBody extends TypeHtml implements ITypeTableBody {
  props: ITypeTableBodyConfig;
  dom?: HTMLTableSectionElement;
  override childNodes: TypeTableRow[];

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'tbody'
    });
    this.childNodes = [];
  }
}
