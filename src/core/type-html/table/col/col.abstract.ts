import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableCol, TypeTableColProps } from './col.interface';

export abstract class TypeTableCol extends TypeHtml implements ITypeTableCol {
  props: TypeTableColProps;
  dom?: HTMLTableColElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'col'
    })
  }
}
