import { TypeHtml } from '../type-html.abstract';
import { ITypeIns, TypeInsProps } from './ins.interface';

export abstract class TypeIns extends TypeHtml implements ITypeIns {
  props: TypeInsProps;
  dom?: HTMLModElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'ins'
    })
  }
}
