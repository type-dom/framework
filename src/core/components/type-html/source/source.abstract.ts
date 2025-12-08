import { TypeHtml } from '../type-html.abstract';
import { ITypeSource, SourceProps } from './source.interface';

export abstract class TypeSource<Props extends SourceProps = SourceProps> extends TypeHtml<Props> implements ITypeSource {
  dom: HTMLSourceElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'source'
    } as Props);
    this.dom = document.createElement('source');
  }
}
