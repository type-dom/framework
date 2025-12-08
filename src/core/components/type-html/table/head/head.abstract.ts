import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableHead, TableHeadProps } from './head.interface';

// 表格页眉
export abstract class TypeTableHead<Props extends TableHeadProps = TableHeadProps> extends TypeHtml<Props> implements ITypeTableHead {
  dom: HTMLTableSectionElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'thead'
    } as Props);
    this.dom = document.createElement('thead');
  }
}
