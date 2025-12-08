import { TypeHtml } from '../type-html.abstract';
import { ITypeDataList, DataListProps } from './data-list.interface';

export abstract class TypeDataList<Props extends DataListProps = DataListProps> extends TypeHtml<Props> implements ITypeDataList {
  dom: HTMLDataListElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'datalist'
    } as Props);
    this.dom = document.createElement('datalist');
  }
}
