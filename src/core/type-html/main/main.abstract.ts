import { TypeHtml } from '../type-html.abstract';
import { ITypeMain, TypeMainProps } from './main.interface';

export abstract class TypeMain extends TypeHtml implements ITypeMain {
  props: TypeMainProps;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'main'
    })
  }
}
