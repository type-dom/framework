import { TypeHtml } from '../type-html.abstract';
import { ITypeData, ITypeDataConfig } from './data.interface';

export abstract class TypeData extends TypeHtml implements ITypeData {
  props: ITypeDataConfig;
  dom?: HTMLDataElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'data'
    })
  }
}
