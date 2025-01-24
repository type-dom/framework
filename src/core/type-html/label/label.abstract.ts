import { TypeHtml } from '../type-html.abstract';
import { ITypeLabel, ITypeLabelConfig } from './label.interface';

export abstract class TypeLabel extends TypeHtml implements ITypeLabel {
  props: ITypeLabelConfig;
  dom?: HTMLLabelElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'label'
    })
  }
}
