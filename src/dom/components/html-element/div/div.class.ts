// import { logger } from '@type-dom/decorators';
import { TypeDiv } from '../../../../core/abstracts/type-html/div/div.abstract';
import { DivProps } from '../../../../core/abstracts/type-html/div/div.interface';
import type { IDiv } from './div.interface';

// @logger.concrete(() => console.error('Div super . '))
export class Div extends TypeDiv implements IDiv {
  className: 'Div';

  constructor(params: DivProps = {}) {
    super(params);
    // console.warn('Div constructor . ');
    this.className = 'Div';
  }
  // @logger.method()
  // static doSomething() {
  //   console.warn('Div doSomething . ');
  // }
  // override setup() {
  //   console.warn('Div setup . ');
  // }
}
