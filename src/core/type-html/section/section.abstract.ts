import { TypeHtml } from '../type-html.abstract';
import type { ITypeSection, ITypeSectionConfig } from './section.interface';

export abstract class TypeSection extends TypeHtml implements ITypeSection {
  props: ITypeSectionConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'section'
    })
  }
}
