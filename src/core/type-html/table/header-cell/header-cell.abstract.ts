import { TextNode } from '../../../../core/text-node/text-node.class';
import { TypeHtml } from '../../type-html.abstract';
import { ITypeTableHeaderCell, TypeTableHeaderCellProps } from './header-cell.interface';

// 表格表头 table header cell
export abstract class TypeTableHeaderCell extends TypeHtml implements ITypeTableHeaderCell {
  props: TypeTableHeaderCellProps;
  dom?: HTMLElement;
  override childNodes: TextNode[];

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'th'
    });
    this.childNodes = [];
  }
}
