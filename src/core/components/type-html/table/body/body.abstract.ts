import { TypeHtml } from '../../type-html.abstract';
import { TypeTableRow } from '../row/row.abstract';
import { ITypeTableBody, TypeTableBodyProps } from './body.interface';

export abstract class TypeTableBody extends TypeHtml implements ITypeTableBody {
  props: TypeTableBodyProps;
  dom?: HTMLTableSectionElement;
  override childNodes: TypeTableRow[];

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'tbody'
    });
    this.childNodes = [];
  }
}
