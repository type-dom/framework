import { TypeHtml } from '../type-html.abstract';
import { ITypeMap, ITypeMapConfig } from './map.interface';

export abstract class TypeMap extends TypeHtml implements ITypeMap {
  props: ITypeMapConfig;
  dom?: HTMLMapElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'map'
    })
  }
}
