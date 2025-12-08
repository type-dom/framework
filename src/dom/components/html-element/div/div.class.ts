// import { logger } from '@type-dom/decorators';
import { TypeDiv } from '../../../../core/components/type-html/div/div.abstract';
import { DivProps } from '../../../../core/components/type-html/div/div.interface';
import { transformSlot } from "../../../../core/helpers/transformSlot";
import { defaultProps } from '../../../../core/helpers/defaultProps';
import type { IDiv } from './div.interface';

// @logger.concrete(() => console.error('Div super . '))
export class Div extends TypeDiv implements IDiv {
  className: 'Div';

  override isBasic = true;

  constructor(params: DivProps = {}) {
    super(defaultProps(params));
    // console.warn('Div constructor . ');
    this.className = 'Div';
    transformSlot(this, params.slot);
  }
  // @logger.method()
  // static doSomething() {
  //   console.warn('Div doSomething . ');
  // }
}
