import { TypeHtml } from '../type-html.abstract';
import { ITypeProgress, ITypeProgressConfig } from './progress.interface';

export abstract class TypeProgress extends TypeHtml implements ITypeProgress {
  props: ITypeProgressConfig;
  dom?: HTMLProgressElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'progress'
    })
  }
}
