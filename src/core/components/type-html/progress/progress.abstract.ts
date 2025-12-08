import { TypeHtml } from '../type-html.abstract';
import { ITypeProgress, ProgressProps } from './progress.interface';

export abstract class TypeProgress<Props extends ProgressProps = ProgressProps> extends TypeHtml<Props> implements ITypeProgress {
  dom: HTMLProgressElement;

  constructor(params: Props = {} as Props)  {
    super(params);
    this.useParams({
      nodeName: 'progress'
    } as Props);
    this.dom = document.createElement('progress');
  }
}
