import { TypeHtml } from '../type-html.abstract';
import { ITypeHr, TypeHrProps } from './hr.interface';

export abstract class TypeHr extends TypeHtml implements ITypeHr {
  props: TypeHrProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'hr'
    })
  }
}
