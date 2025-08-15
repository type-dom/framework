import { TypeHtml } from '../type-html.abstract';
import { ITypeProgress, TypeProgressProps } from './progress.interface';

export abstract class TypeProgress extends TypeHtml implements ITypeProgress {
  props: TypeProgressProps;
  dom?: HTMLProgressElement;

  constructor()  {
    super();
    this.props = this.useParams({
      nodeName: 'progress'
    })
  }
}
