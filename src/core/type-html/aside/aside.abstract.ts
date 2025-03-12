import { TypeHtml } from '../type-html.abstract';
import { ITypeAside, TypeAsideProps } from './aside.interface';

export abstract class TypeAside extends TypeHtml implements ITypeAside {
  props: TypeAsideProps;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'aside'
    })
  }
}
