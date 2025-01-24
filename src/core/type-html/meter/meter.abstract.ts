import { TypeHtml } from '../type-html.abstract';
import { ITypeMeter, ITypeMeterConfig } from './meter.interface';

export abstract class TypeMeter extends TypeHtml implements ITypeMeter {
  props: ITypeMeterConfig;
  dom?: HTMLMeterElement;

  protected constructor() {
    super();
    this.props = this.useParams({
      nodeName: 'meter'
    })
  }
}
