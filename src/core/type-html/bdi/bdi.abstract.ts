import { TypeHtml } from '../type-html.abstract';
import { ITypeBdi, TypeBdiProps } from './bdi.interface';

export abstract class TypeBdi extends TypeHtml implements ITypeBdi {
  props: TypeBdiProps;
  dom?: HTMLElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'bdi',
    })
  }
}
