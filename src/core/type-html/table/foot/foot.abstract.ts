import { TypeHtml } from '../../type-html.abstract';
import { TypeTableRow } from '../row/row.abstract';
import { ITypeTableFoot, ITypeTableFootConfig } from './foot.interface';

export abstract class TypeTableFoot extends TypeHtml implements ITypeTableFoot {
  props: ITypeTableFootConfig;
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
