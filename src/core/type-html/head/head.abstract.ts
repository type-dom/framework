import { TypeHtml } from '../type-html.abstract';
import { ITypeHead, TypeHeadProps } from './head.interface';

export abstract class TypeHead extends TypeHtml implements ITypeHead {
  props: TypeHeadProps;
  dom?: HTMLHeadingElement;

  protected constructor(nodeName: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'h1') {
    super();
    this.props = this.useParams({
      nodeName
    })
  }
}
