import { TypeHtml } from '../type-html.abstract';
import { ITypeDataList, TypeDataListProps } from './data-list.interface';

export abstract class TypeDataList extends TypeHtml implements ITypeDataList {
  props: TypeDataListProps;
  dom?: HTMLDataListElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'datalist'
    })
  }
}
