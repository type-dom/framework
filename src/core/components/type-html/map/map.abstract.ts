import { TypeHtml } from '../type-html.abstract';
import { ITypeMap, MapProps } from './map.interface';

export abstract class TypeMap<Props extends MapProps = MapProps> extends TypeHtml<Props> implements ITypeMap {
  dom: HTMLMapElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'map'
    } as Props);
    this.dom = document.createElement('map');
  }
}
