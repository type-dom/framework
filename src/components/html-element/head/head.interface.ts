import type {
  ITypeHead,
  TypeHeadProps,
} from '../../../core/type-html/head/head.interface';

export interface IHead extends ITypeHead {
  className: 'Head';
}

export interface HeadProps extends TypeHeadProps {
  nodeName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}
