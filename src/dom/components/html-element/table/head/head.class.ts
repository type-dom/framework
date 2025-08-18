import { TypeTableHead } from '../../../../../core/components/type-html/table/head/head.abstract';
import { TypeTableHeadProps } from '../../../../../core/components/type-html/table/head/head.interface';
import type { ITableHead } from './head.interface';

// 表格页眉
export class TableHead extends TypeTableHead implements ITableHead {
  className: 'TableHead';
  override props: TypeTableHeadProps;

  override isBasic = true;

  constructor(params: TypeTableHeadProps = {}) {
    super();
    this.className = 'TableHead';
    this.slotChildren(params.slot);
    this.props = this.useParams(params);
  }
}
