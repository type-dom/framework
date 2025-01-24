import { TypeHtml } from '../type-html.abstract';
import { ITypeFigCaption, ITypeFigCaptionConfig } from './fig-caption.interface';

export abstract class TypeFigCaption extends TypeHtml implements ITypeFigCaption {
  props: ITypeFigCaptionConfig;
  dom?: HTMLElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'figcaption'
    })
  }
}
