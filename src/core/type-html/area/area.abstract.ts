import { TypeHtml } from '../type-html.abstract';
import type { ITypeArea, TypeAreaProps } from './area.interface';

export abstract class TypeArea extends TypeHtml implements ITypeArea {
  props: TypeAreaProps;
  dom?: HTMLAreaElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'area'
    })
  }
}
