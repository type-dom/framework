import type { ITypeHtml, HtmlProps } from '../type-html.interface';
import { IntrinsicElementAttributes } from '../../attribute';

export interface ITypeAside extends ITypeHtml {
  props: TypeAsideProps;
}

export interface TypeAsideProps extends HtmlProps {
  nodeName?: 'aside';
  attrObj?: IntrinsicElementAttributes['aside'];
}
