import { TypeHtml } from '../type-html.abstract';
import { TypeLI } from '../li/li.abstract';
import type { ITypeUL, ITypeULConfig } from './ul.interface';

export abstract class TypeUL extends TypeHtml implements ITypeUL {
  props: ITypeULConfig;
  dom?: HTMLUListElement;
  override childNodes: TypeLI[];

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'ul',
    });
    this.style.addObj({
      margin: '0',
      padding: '0'
    });
    this.childNodes = [];
  }
}
