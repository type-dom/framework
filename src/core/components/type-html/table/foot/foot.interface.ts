import { IntrinsicElementAttributes } from '../../../../../dom/modules/attribute/attribute.interface';
import { ITypeHtml, HtmlProps } from '../../type-html.interface';

export interface ITypeTableFoot extends ITypeHtml {
  props: TypeTableFootProps;
}

export interface TypeTableFootProps extends HtmlProps {
  nodeName?: 'tfoot';
  attrObj?: IntrinsicElementAttributes['tfoot'];
}
