import { TypeHtml } from '../type-html.abstract';
import { ITypeMap, TypeMapProps } from './map.interface';

export abstract class TypeMap extends TypeHtml implements ITypeMap {
  props: TypeMapProps;
  dom?: HTMLMapElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'map'
    })
  }
}
