import { TypeHtml } from '../type-html.abstract';
import { ITypeHr, ITypeHrConfig } from './hr.interface';

export abstract class TypeHr extends TypeHtml implements ITypeHr {
  props: ITypeHrConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'hr'
    })
  }
}
