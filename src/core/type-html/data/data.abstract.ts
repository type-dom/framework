import { TypeHtml } from '../type-html.abstract';
import { ITypeData, TypeDataProps } from './data.interface';

export abstract class TypeData extends TypeHtml implements ITypeData {
  props: TypeDataProps;
  dom?: HTMLDataElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'data'
    })
  }
}
