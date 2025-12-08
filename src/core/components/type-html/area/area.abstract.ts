import { TypeHtml } from '../type-html.abstract';
import type { ITypeArea, AreaProps } from './area.interface';

export abstract class TypeArea<Props extends AreaProps = AreaProps> extends TypeHtml<Props> implements ITypeArea {
  dom: HTMLAreaElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'area'
    } as Props);
    this.dom = document.createElement('area');
  }
}
