import { TypeHtml } from '../type-html.abstract';
import type { ITypeSub } from './sub.interface';

export abstract class TypeSub extends TypeHtml implements ITypeSub {
  props: ITypeSub['props'];
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'sub',
    })
  }
}
