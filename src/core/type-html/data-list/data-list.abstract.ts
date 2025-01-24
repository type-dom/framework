import { TypeHtml } from '../type-html.abstract';
import { ITypeDataList, ITypeDataListConfig } from './data-list.interface';

export abstract class TypeDataList extends TypeHtml implements ITypeDataList {
  props: ITypeDataListConfig;
  dom?: HTMLDataListElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'datalist'
    })
  }
}
