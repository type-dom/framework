import { IntrinsicElementAttributes } from '../../../../dom/modules/attribute/attribute.interface';
import type { ITypeHtml, HtmlProps } from '../type-html.interface';

export interface ITypeMeter extends ITypeHtml {
  props: TypeMeterProps;
}

export interface TypeMeterProps extends HtmlProps {
  nodeName?: 'meter';
  attrObj?: IntrinsicElementAttributes['meter'];
}
