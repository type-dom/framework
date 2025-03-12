import { TypeHtml } from '../../type-html.abstract';
import { TypeTableRow } from '../row/row.abstract';
import { ITypeTableFoot, TypeTableFootProps } from './foot.interface';

export abstract class TypeTableFoot extends TypeHtml implements ITypeTableFoot {
  props: TypeTableFootProps;
  dom?: HTMLElement;
  override childNodes: TypeTableRow[];

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'tfoot'
    })
    this.childNodes = [];
  }
}
