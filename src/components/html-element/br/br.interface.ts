import type {
  ITypeBr,
  TypeBrProps,
} from '../../../core/type-html/br/br.interface';
import type { TypeProps } from '../../../core/type-node/type-node.interface';
import { TypeHtml } from '../../../index';

export interface IBr extends ITypeBr {
  className: 'Br';
  props: IBrProps;
}

export interface IBrProps extends TypeBrProps {
  attrObj: never;
  styleObj: never;
  childNodes: never;
}
