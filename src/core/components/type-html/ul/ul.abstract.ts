import { TypeHtml } from '../type-html.abstract';
import { TypeLI } from '../li/li.abstract';
import type { ITypeUL, TypeULProps } from './ul.interface';

export abstract class TypeUL extends TypeHtml implements ITypeUL {
  props: TypeULProps;
  dom?: HTMLUListElement;
  override childNodes: TypeLI[];

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'ul',
    });
    this.childNodes = [];
  }
}
