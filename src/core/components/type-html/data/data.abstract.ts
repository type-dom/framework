import { TypeHtml } from '../type-html.abstract';
import { ITypeData, DataProps } from './data.interface';

export abstract class TypeData<Props extends DataProps = DataProps> extends TypeHtml<Props> implements ITypeData {
  dom: HTMLDataElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'data'
    } as Props);
    this.dom = document.createElement('data');
  }
}
