import { TypeHtml } from '../type-html.abstract';
import type { ITypeSup } from './sup.interface';

export abstract class TypeSup extends TypeHtml implements ITypeSup {
  props: ITypeSup['props'];
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'sup'
    })
  }
}
