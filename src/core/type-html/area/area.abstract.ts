import { TypeHtml } from '../type-html.abstract';
import type { ITypeArea, ITypeAreaConfig } from './area.interface';

export abstract class TypeArea extends TypeHtml implements ITypeArea {
  props: ITypeAreaConfig;
  dom?: HTMLAreaElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'area'
    })
  }
}
