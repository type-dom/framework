import { TypeHtml } from '../../type-html.abstract';
import { TypeTableHeaderCell } from '../header-cell/header-cell.abstract';
import { ITypeTableHead, TypeTableHeadProps } from './head.interface';

// 表格页眉
export abstract class TypeTableHead extends TypeHtml implements ITypeTableHead {
  props: TypeTableHeadProps;
  dom?: HTMLTableSectionElement;
  override childNodes: TypeTableHeaderCell[];

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'thead'
    });
    this.childNodes = [];
  }
}
