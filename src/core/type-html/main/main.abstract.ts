import { TypeHtml } from '../type-html.abstract';
import { ITypeMain, ITypeMainConfig } from './main.interface';

export abstract class TypeMain extends TypeHtml implements ITypeMain {
  props: ITypeMainConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'main'
    })
  }
}
