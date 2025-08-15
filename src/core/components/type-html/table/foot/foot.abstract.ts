import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableFoot, TypeTableFootProps } from './foot.interface';

export abstract class TypeTableFoot extends TypeHtml implements ITypeTableFoot {
  props: TypeTableFootProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'tfoot'
    })
    // this.childNodes = [];
  }
}
