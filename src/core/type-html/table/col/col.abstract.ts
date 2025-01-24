import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableCol, ITypeTableColConfig } from './col.interface';

export abstract class TypeTableCol extends TypeHtml implements ITypeTableCol {
  props: ITypeTableColConfig;
  dom?: HTMLTableColElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'col'
    })
  }
}
