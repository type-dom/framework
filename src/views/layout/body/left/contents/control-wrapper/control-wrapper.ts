import { Display } from '../../../../../../../type-dom/style/style.enum';
import { TypeDiv } from '../../../../../../../type-dom/type-element/type-html/div/div.abstract';
import { LeftContents } from '../contents';
import { BasicControlWrapper } from './basic-control-wrapper/basic-control-wrapper';
import { ComplexControlWrapper } from './complex-control-wrapper/complex-control-wrapper';

export class ControlWrapper extends TypeDiv {
  className: 'ControlWrapper';
  childNodes: [BasicControlWrapper, ComplexControlWrapper];
  formControlWrapper: BasicControlWrapper;
  staticControlWrapper: ComplexControlWrapper;

  constructor(public parent: LeftContents) {
    super();
    this.className = 'ControlWrapper';
    this.addStyleObj({
      display: Display.flex,
      flexDirection: 'column',
      padding: '10px',
    });
    this.addAttrName('control-wrapper');
    this.formControlWrapper = new BasicControlWrapper(this);
    this.staticControlWrapper = new ComplexControlWrapper(this);
    this.childNodes = [this.formControlWrapper, this.staticControlWrapper];
  }
}
